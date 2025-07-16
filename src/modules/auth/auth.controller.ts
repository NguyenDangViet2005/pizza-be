/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common'
import { LoginDTO } from '~/dto/login.dto'
import { RefreshTokenDTO } from '~/dto/refresh-token.dto'
import { RegisterDTO } from '~/dto/register.dto'
import { UserEntity } from '~/entities'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { AuthService } from '~/modules/auth/auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body() RegisterData: RegisterDTO,
  ): Promise<ResponseData<UserEntity>> {
    const res = await this.authService.register(RegisterData)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, res)
  }

  @Post('login')
  async login(@Body() loginData: LoginDTO): Promise<ResponseData<UserEntity>> {
    const res = await this.authService.login(loginData)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenData: RefreshTokenDTO,
  ): Promise<ResponseData<any>> {
    const res = await this.authService.refreshToken(refreshTokenData)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }
}
