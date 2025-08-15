/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { OrderService } from '~/modules/order/order.service'
import { OrderRequest } from '~/request/order.request'
import { Request } from 'express'
import { AuthService } from '~/modules/auth/auth.service'
import { OrderDto } from '~/dto/order.dto'

@Controller()
export class OrderController {
  constructor(
    private readonly authService: AuthService,
    private readonly orderService: OrderService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('order')
  async orderFood(
    @Req() req: Request,
    @Body() orderRequest: OrderRequest,
  ): Promise<ResponseData<boolean>> {
    const accessToken = req.cookies['accessToken']
    if (!accessToken) {
      throw new UnauthorizedException('Access token không tồn tại!')
    }
    const payload = this.jwtService.verify(accessToken)
    const userId = payload.sub
    const user = await this.authService.getUserById(userId)
    if (!user) {
      throw new UnauthorizedException('User không tồn tại!')
    }
    const result = await this.orderService.orderFood(orderRequest, user)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, result)
  }

  @Get('get-order')
  async getOrder(@Req() req: Request): Promise<ResponseData<OrderDto[]>> {
    const accessToken = req.cookies['accessToken']
    console.log(accessToken)

    if (!accessToken) {
      throw new UnauthorizedException('Access token không tồn tại!')
    }
    const payload = this.jwtService.verify(accessToken)
    const userId = payload.sub
    const user = await this.authService.getUserById(userId)
    if (!user) {
      throw new UnauthorizedException('User không tồn tại!')
    }
    const result = await this.orderService.getOrderByUserId(userId)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, result)
  }
}
