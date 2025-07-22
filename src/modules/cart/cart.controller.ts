/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { CartComboDTO } from '~/dto/cart-combo.dto'
import { CartFoodItemDTO } from '~/dto/cart-food-item.dto'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { CartService } from '~/modules/cart/cart.service'
import { CartComboRequest } from '~/request/cart-combo.request'
import { CartFoodItemRequest } from '~/request/cart-food-item.request'

@Controller()
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Post('add-food')
  async addFoodToCart(
    @Body() cartFoodRequest: CartFoodItemRequest,
  ): Promise<ResponseData<boolean>> {
    const result = await this.cartService.addFoodToCart(cartFoodRequest)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, result)
  }

  @Post('add-combo')
  async addComboToCart(
    @Body() cartComboDTO: CartComboRequest,
  ): Promise<ResponseData<boolean>> {
    const result = await this.cartService.addComboToCart(cartComboDTO)
    return new ResponseData(HttpStatus.CREATED, ResponseMessage.SUCCESS, result)
  }

  @Get('get-cart')
  async getCart(@Query('userId') userId: number): Promise<ResponseData<any>> {
    const result = await this.cartService.getCart(Number(userId))
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, result)
  }
}
