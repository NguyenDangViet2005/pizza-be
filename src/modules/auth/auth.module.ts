/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from '~/entities'
import { AuthController } from '~/modules/auth/auth.controller'
import { AuthService } from '~/modules/auth/auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
