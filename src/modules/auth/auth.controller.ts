/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common'
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
}
