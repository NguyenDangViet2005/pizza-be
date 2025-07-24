/*
https://docs.nestjs.com/modules
*/

import { JwtModule } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RefreshTokenEntity, UserEntity } from '~/entities'
import { AuthController } from '~/modules/auth/auth.controller'
import { AuthService } from '~/modules/auth/auth.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RefreshTokenEntity]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
