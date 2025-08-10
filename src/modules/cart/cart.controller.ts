/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { CartComboDTO } from '~/dto/cart-combo.dto'
import { CartFoodItemDTO } from '~/dto/cart-food-item.dto'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { CartService } from '~/modules/cart/cart.service'
import { CartComboRequest } from '~/request/cart-combo.request'
import { CartFoodItemRequest } from '~/request/cart-food-item.request'
import { Request } from 'express'
import { AuthService } from '~/modules/auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Controller()
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('add-food')
  async addFoodToCart(
    @Body() cartFoodRequest: CartFoodItemRequest,
    @Req() req: Request,
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
    const result = await this.cartService.addFoodToCart(cartFoodRequest)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, result)
  }

  @Post('add-combo')
  async addComboToCart(
    @Body() cartComboDTO: CartComboRequest,
    @Req() req: Request,
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
    const result = await this.cartService.addComboToCart(cartComboDTO)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, result)
  }

  @Get('get-cart')
  async getCart(@Req() req: Request): Promise<ResponseData<any>> {
    const accessToken = req.cookies['accessToken']
    console.log('accessToken', accessToken)
    if (!accessToken) {
      throw new UnauthorizedException('Access token không tồn tại!')
    }
    const payload = this.jwtService.verify(accessToken)
    const userId = payload.sub
    const user = await this.authService.getUserById(userId)
    if (!user) {
      throw new UnauthorizedException('User không tồn tại!')
    }
    const result = await this.cartService.getCart(user)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, result)
  }

  @Delete('delete-item-cart')
  async deleteItemCart(
    @Query('id') id: string,
    @Req() req: Request,
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
    const result = await this.cartService.deleteItemCart(id)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, result)
  }
}
