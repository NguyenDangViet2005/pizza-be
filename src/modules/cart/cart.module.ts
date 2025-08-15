import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {} from '~/entities/cart-food-item.entity'
import { CartController } from '~/modules/cart/cart.controller'
import { CartService } from '~/modules/cart/cart.service'
import {
  FoodSizeCrustEntity,
  CartComboItemEntity,
  CartComboEntity,
  CartFoodItemEntity,
  ComboFoodEntity,
  ComboFoodItemEntity,
} from '~/entities'
import { AuthModule } from '~/modules/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CartFoodItemEntity,
      FoodSizeCrustEntity,
      CartComboEntity,
      CartComboItemEntity,
      ComboFoodEntity,
      ComboFoodItemEntity,
    ]),
    AuthModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
