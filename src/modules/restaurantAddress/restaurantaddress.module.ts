/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { RestaurantAddressController } from './restaurantaddress.controller'
import { RestaurantAddressService } from './restaurantaddress.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RestaurantAddressEntity } from '~/entities'

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantAddressEntity])],
  controllers: [RestaurantAddressController],
  providers: [RestaurantAddressService],
})
export class RestaurantAddressModule {}
