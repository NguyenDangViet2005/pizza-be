/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '~/entities'
import * as bcrypt from 'bcrypt'
import { RegisterDTO } from '~/dto/register.dto'
import { Repository } from 'typeorm'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
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
}
