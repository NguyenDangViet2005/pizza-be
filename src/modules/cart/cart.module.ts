/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {} from '~/entities/cart-food-item.entity'
import { CartController } from '~/modules/cart/cart.controller'
import { CartService } from '~/modules/cart/cart.service'
import {
  FoodSizeCrustEntity,
  UserEntity,
  CartComboItemEntity,
  CartComboEntity,
  CartFoodItemEntity,
  ComboFoodEntity,
  ComboFoodItemEntity,
} from '~/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartFoodItemEntity,
      FoodSizeCrustEntity,
      CartComboEntity,
      CartComboItemEntity,
      UserEntity,
      ComboFoodEntity,
      ComboFoodItemEntity,
    ]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
