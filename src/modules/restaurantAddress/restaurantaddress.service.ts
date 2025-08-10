/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RestaurantAddressEntity } from '~/entities'
import { RestaurantAddressDto } from '~/dto/restaurantAddress.dto'
import { convertRestaurantAddressToDto } from '~/mapper/restaurant-address.mapper'

@Injectable()
export class RestaurantAddressService {
  constructor(
    @InjectRepository(RestaurantAddressEntity)
    private readonly restaurantAddressRepository: Repository<RestaurantAddressEntity>,
  ) {}

  async getRestaurantAddress(): Promise<RestaurantAddressDto[]> {
    const restaurantAddress = await this.restaurantAddressRepository.find()
    const listRestaurantAddressDTO: RestaurantAddressDto[] = []

    restaurantAddress.forEach((item) => {
      listRestaurantAddressDTO.push(convertRestaurantAddressToDto(item))
    })

    return listRestaurantAddressDTO
  }
}
