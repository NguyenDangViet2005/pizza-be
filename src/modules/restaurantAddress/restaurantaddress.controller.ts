/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common'
import { RestaurantAddressService } from './restaurantaddress.service'
import { RestaurantAddressDto } from '~/dto/restaurantAddress.dto'
import { ResponseData } from '~/global/ResponseData'
import { ResponseMessage } from '~/global/ResponseEnum'
import { HttpStatus } from '~/global/ResponseEnum'

@Controller('restaurant-address')
export class RestaurantAddressController {
  constructor(
    private readonly restaurantAddressService: RestaurantAddressService,
  ) {}

  @Get()
  async getRestaurantAddress(): Promise<ResponseData<RestaurantAddressDto[]>> {
    const listRestaurantAddress =
      await this.restaurantAddressService.getRestaurantAddress()
    return new ResponseData(
      HttpStatus.OK,
      ResponseMessage.SUCCESS,
      listRestaurantAddress,
    )
  }
}
