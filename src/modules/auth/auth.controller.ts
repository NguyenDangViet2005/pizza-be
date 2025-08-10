/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common'
import { LoginRequest } from '~/request/login.request'
import { RefreshTokenDTO } from '~/dto/refresh-token.dto'
import { UserEntity } from '~/entities'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { AuthService } from '~/modules/auth/auth.service'
import { Response, Request } from 'express'
import { RegisterRequest } from '~/request/register.request'
import { JwtService } from '@nestjs/jwt'
import { ChangePasswordRequest } from '~/request/change-password.request'
import { UserInfoRequest } from '~/request/user-info.request'
import { request } from 'http'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('register')
  async register(
    @Body() RegisterData: RegisterRequest,
  ): Promise<ResponseData<boolean>> {
    const res = await this.authService.register(RegisterData)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, res)
  }

  @Post('login')
  async login(
    @Body() loginData: LoginRequest,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseData<any>> {
    const result = await this.authService.login(loginData)
    res.cookie('refreshToken', result.token.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    res.cookie('accessToken', result.token.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    return new ResponseData(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      result.userWithoutPassword,
    )
  }

  @Post('refresh-token')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ResponseData<any>> {
    const refreshToken = req.cookies['refreshToken']
    const accessToken = req.cookies['accessToken']
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token không tồn tại!')
    }

    // Gọi service để kiểm tra accessToken có được phép refresh không
    this.authService.checkAccessTokenShouldRefresh(accessToken)

    // Gọi service để kiểm tra & cấp token mới
    const result = await this.authService.refreshToken(refreshToken)

    // Ghi refresh token mới vào cookie
    res.cookie('refreshToken', result.newToken.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    res.cookie('accessToken', result.newToken.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000,
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

    // Xóa cookie refresh token và access token
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, null)
  }

  @Get('user-from-token')
  async getUserFromToken(@Req() req: Request): Promise<ResponseData<any>> {
    const accessToken = req.cookies['accessToken']
    if (!accessToken) {
      throw new UnauthorizedException('Access token không tồn tại!')
    }
    console.log(accessToken)

    const payload = this.jwtService.verify(accessToken)
    const user = await this.authService.getUserById(payload.sub)
    if (!user) {
      throw new UnauthorizedException('User không tồn tại!')
    }
    const { password, ...userWithoutPassword } = user
    return new ResponseData(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      userWithoutPassword,
    )
  }

  @Post('change-password')
  async changePassword(
    @Body() changePasswordRequest: ChangePasswordRequest,
    @Req() req: Request,
  ): Promise<ResponseData<any>> {
    const accessToken = req.cookies['accessToken']
    if (!accessToken) {
      throw new UnauthorizedException('Access token không tồn tại!')
    }

    const payload = this.jwtService.verify(accessToken)
    const user = await this.authService.getUserById(payload.sub)
    if (!user) {
      throw new UnauthorizedException('User không tồn tại!')
    }
    const res = await this.authService.changePassword(
      changePasswordRequest,
      user,
    )
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }

  @Post('change-user-info')
  async changeUserInfo(
    @Body() userInfoRequest: UserInfoRequest,
    @Req() req: Request,
  ): Promise<ResponseData<any>> {
    const accessToken = req.cookies['accessToken']
    if (!accessToken) {
      throw new UnauthorizedException('Access token không tồn tại!')
    }

    const payload = this.jwtService.verify(accessToken)
    const user = await this.authService.getUserById(payload.sub)
    if (!user) {
      throw new UnauthorizedException('User không tồn tại!')
    }
    const res = await this.authService.changeUserInfo(userInfoRequest, user)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }
}
