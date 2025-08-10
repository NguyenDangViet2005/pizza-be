/*
https://docs.nestjs.com/providers#services
*/

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RefreshTokenEntity, UserEntity } from '~/entities'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { LoginRequest } from '~/request/login.request'
import { JwtService } from '@nestjs/jwt'
import { v4 as uuidv4 } from 'uuid'
import { RefreshTokenDTO } from '~/dto/refresh-token.dto'
import { RegisterRequest } from '~/request/register.request'
import * as jwt from 'jsonwebtoken'
import { ChangePasswordRequest } from '~/request/change-password.request'
import { UserInfoRequest } from '~/request/user-info.request'
import { CloudinaryService } from '~/modules/cloudinary/cloudinary.service'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private readonly jwtService: JwtService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async register(registerData: RegisterRequest): Promise<boolean> {
    const { phoneNumber, email, password } = registerData
    const existingUser = await this.userRepository.findOne({
      where: { email },
    })
    const existingPhoneNumber = await this.userRepository.findOne({
      where: { phoneNumber },
    })
    if (existingPhoneNumber) {
      throw new BadRequestException('Số điện thoại đã được sử dụng!')
    }
    if (existingUser) {
      throw new BadRequestException('Email đã được sử dụng!')
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await this.userRepository.create({
        ...registerData,
        password: hashedPassword,
      })
      await this.userRepository.save(user)
      return true
    } catch (error) {
      throw new BadRequestException('Đăng ký không thành công!')
    }
    return false
  }

  async login(loginData: LoginRequest): Promise<any> {
    const { email, password } = loginData
    const user = await this.userRepository.findOne({
      where: { email },
    })
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại!')
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu không đúng!')
    }
    // Xóa tất cả refresh token cũ của người dùng
    await this.refreshTokenRepository.delete({ user: { id: user.id } })
    const { password: _, ...userWithoutPassword } = user // _ là biến tạm để loại bỏ password khỏi đối tượng trả về, tránh bị trùng với password trong Request
    const token = this.generateToken(user)
    return { userWithoutPassword, token }
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
      relations: ['user'],
    })
    if (!tokenEntity) {
      throw new BadRequestException('Refresh token không hợp lệ!')
    }
    if (tokenEntity.expiryDate < new Date()) {
      throw new BadRequestException('Refresh token đã hết hạn!')
    }
    // Xóa refresh token cũ
    await this.refreshTokenRepository.remove(tokenEntity)
    const user = tokenEntity.user
    const { password: _, ...userWithoutPassword } = user
    const newToken = this.generateToken(user)
    return { userWithoutPassword, newToken }
  }

  generateToken(user: UserEntity): any {
    const payload = { email: user.email, sub: user.id }
    const accessToken = this.jwtService.sign(payload, {
      // secret: this.configService.get<string>('JWT_SECRET'),
    })
    const refreshToken = uuidv4() // vd: "de305d54-75b4-431b-adb2-eb6b9e546014"
    this.createRefreshToken(refreshToken, user)
    // Lưu refresh token vào cơ sở dữ liệu
    return {
      accessToken,
      refreshToken,
    }
  }

  async createRefreshToken(
    refreshToken: string,
    user: UserEntity,
  ): Promise<RefreshTokenEntity> {
    const newRefreshToken = await this.refreshTokenRepository.create({
      token: refreshToken,
      user: user,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 day
    })
    return this.refreshTokenRepository.save(newRefreshToken)
  }

  async logout(refreshToken: string): Promise<void> {
    const tokenEntity = await this.refreshTokenRepository.findOne({
      where: { token: refreshToken },
    })
    if (!tokenEntity) {
      throw new BadRequestException('Refresh token không hợp lệ!')
    }
    // Xóa refresh token khỏi cơ sở dữ liệu
    await this.refreshTokenRepository.remove(tokenEntity)
  }

  async getUserById(userId: number): Promise<UserEntity | null> {
    return this.userRepository.findOne({ where: { id: userId } })
  }

  checkAccessTokenShouldRefresh(accessToken: string): void {
    if (!accessToken) {
      throw new BadRequestException('Access token không tồn tại!')
    }
    let decoded: any
    try {
      decoded = jwt.decode(accessToken)
    } catch (e) {
      throw new BadRequestException('Access token không hợp lệ!')
    }
    if (!decoded || !decoded.exp) {
      throw new BadRequestException('Access token không hợp lệ!')
    }
    const now = Math.floor(Date.now() / 1000)
    const timeLeft = decoded.exp - now
    if (timeLeft > 5 * 60) {
      throw new BadRequestException('Access token chưa cần refresh!')
    }
  }

  async changePassword(
    changePasswordRequest: ChangePasswordRequest,
    user: UserEntity,
  ): Promise<boolean> {
    const { oldPassword, newPassword } = changePasswordRequest
    // Kiểm tra mật khẩu cũ
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordValid) {
      throw new BadRequestException('Mật khẩu cũ không đúng!')
    }
    // Hash mật khẩu mới
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedNewPassword
    try {
      await this.userRepository.save(user)
      return true
    } catch (error) {
      throw new BadRequestException('Đổi mật khẩu không thành công!')
    }
  }

  async changeUserInfo(
    userInfoRequest: UserInfoRequest,
    user: UserEntity,
  ): Promise<boolean> {
    const { fullname, email, phoneNumber, avatar, avatar_public_id } =
      userInfoRequest

    user.fullname = fullname
    user.email = email
    user.phoneNumber = phoneNumber

    if (avatar && avatar_public_id) {
      // 🧠 Nếu có avatar mới, thì xóa ảnh cũ
      if (user.avatar_public_id) {
        await this.cloudinaryService.deleteImage(user.avatar_public_id)
      }

      user.avatar = avatar
      user.avatar_public_id = avatar_public_id
    }

    try {
      await this.userRepository.save(user)
      return true
    } catch (e) {
      throw new BadRequestException('Đổi thông tin tài khoản không thành công!')
    }
  }
}
