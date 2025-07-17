/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { LoginDTO } from '~/dto/login.dto'
import { RefreshTokenDTO } from '~/dto/refresh-token.dto'
import { RegisterDTO } from '~/dto/register.dto'
import { UserEntity } from '~/entities'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { AuthService } from '~/modules/auth/auth.service'
import { Response, Request } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(
    @Body() RegisterData: RegisterDTO,
  ): Promise<ResponseData<boolean>> {
    const res = await this.authService.register(RegisterData)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, res)
  }

  @Post('login')
  async login(
    @Body() loginData: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseData<any>> {
    const result = await this.authService.login(loginData)
    res.cookie('refreshToken', result.token.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    })

    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, {
      user: result.userWithoutPassword,
      accessToken: result.token.accessToken,
    })
  }

  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseData<any>> {
    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token không tồn tại!')
    }

    // Gọi service để kiểm tra & cấp token mới
    const result = await this.authService.refreshToken(refreshToken)

    // Ghi refresh token mới vào cookie
    res.cookie('refreshToken', result.newToken.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    })

    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, {
      user: result.userWithoutPassword,
      accessToken: result.newToken.accessToken,
    })
  }

  @Post('logout')
  logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): ResponseData<any> {
    const refreshToken = req.cookies['refreshToken']
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token không tồn tại!')
    }

    // Gọi service để xóa refresh token
    this.authService.logout(refreshToken)

    // Xóa cookie refresh token
    res.clearCookie('refreshToken')

    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, null)
  }
}
