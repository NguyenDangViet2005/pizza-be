/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { EmailService } from '~/modules/email/email.service'
import { OrderRequest } from '~/request/order.request'
import { Request } from 'express'
import { JwtService } from '@nestjs/jwt'

@Controller()
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
  ) {}
  @Get('verify')
  async verify(@Query('token') token: string): Promise<ResponseData<any>> {
    const res = await this.emailService.verifyEmail(token)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, res)
  }

  @Post('send-email-after-order')
  async sendEmailAfterOrder(
    @Body() orderRequest: OrderRequest,
    @Req() req: Request,
  ): Promise<ResponseData<any>> {
    const accessToken = req.cookies['accessToken']
    if (!accessToken) {
      throw new UnauthorizedException('Access token không tồn tại!')
    }
    const payload = this.jwtService.verify(accessToken)
    const res = await this.emailService.sendEmailAfterOrder(
      orderRequest,
      payload.email,
    )
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, res)
  }
}
