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
  RefreshTokenEntity,
} from '~/entities'
import { AuthModule } from '~/modules/auth/auth.module'
import { AuthService } from '~/modules/auth/auth.service'
import { CloudinaryModule } from '~/modules/cloudinary/cloudinary.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartFoodItemEntity,
      FoodSizeCrustEntity,
      CartComboEntity,
      CartComboItemEntity,
      ComboFoodEntity,
      ComboFoodItemEntity,
      UserEntity,
      RefreshTokenEntity,
    ]),
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [CartController],
  providers: [CartService, AuthService],
})
export class CartModule {}
