/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '~/entities'
import * as bcrypt from 'bcrypt'
import { RegisterDTO } from '~/dto/register.dto'
import { Repository } from 'typeorm'
import { LoginDTO } from '~/dto/login.dto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}
  async register(registerData: RegisterDTO): Promise<UserEntity> {
    const { email, password } = registerData
    const existingUser = await this.userRepository.findOne({
      where: { email },
    })
    if (existingUser) {
      throw new BadRequestException('Người dùng này đã tồn tại!')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userRepository.create({
      ...registerData,
      password: hashedPassword,
    })
    return this.userRepository.save(user)
  }

  async login(loginData: LoginDTO): Promise<any> {
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
    const token = this.generateToken(user)
    return { user, token }
  }

  generateToken(user: UserEntity): string {
    const payload = { email: user.email, sub: user.id }
    return this.jwtService.sign(payload)
  }
}
