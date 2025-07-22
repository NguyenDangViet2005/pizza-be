/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RefreshTokenEntity, UserEntity } from '~/entities'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { LoginRequest } from '~/request/login.request'
import { JwtService } from '@nestjs/jwt'
import { v4 as uuidv4 } from 'uuid'
import { RefreshTokenDTO } from '~/dto/refresh-token.dto'
import { RegisterRequest } from '~/request/register.request'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    private jwtService: JwtService,
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
    const accessToken = this.jwtService.sign(payload)
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
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 day
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
}
