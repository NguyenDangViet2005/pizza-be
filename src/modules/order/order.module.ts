/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  CartComboEntity,
  CartComboItemEntity,
  CartFoodItemEntity,
  OrderEntity,
  OrderItemEntity,
} from '~/entities'
import { AuthModule } from '~/modules/auth/auth.module'
import { OrderController } from '~/modules/order/order.controller'
import { OrderService } from '~/modules/order/order.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      CartComboEntity,
      CartFoodItemEntity,
      CartComboItemEntity,
    ]),
    AuthModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
