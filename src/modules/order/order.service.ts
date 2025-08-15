/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { OrderDto } from '~/dto/order.dto'
import {
  CartComboEntity,
  CartComboItemEntity,
  CartFoodItemEntity,
  OrderEntity,
  UserEntity,
} from '~/entities'
import {
  convertToOrderDto,
  convertToOrderEntity,
  convertToOrderItemEntity,
} from '~/mapper/order.mapper'
import { OrderRequest } from '~/request/order.request'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(CartFoodItemEntity)
    private readonly cartFoodItemRepository: Repository<CartFoodItemEntity>,
    @InjectRepository(CartComboEntity)
    private readonly cartComboRepository: Repository<CartComboEntity>,
    @InjectRepository(CartComboItemEntity)
    private readonly cartComboItemRepository: Repository<CartComboItemEntity>,
  ) {}

  async orderFood(
    orderRequest: OrderRequest,
    user: UserEntity,
  ): Promise<boolean> {
    const orderEntity = convertToOrderEntity(orderRequest, user)
    const order_items = orderRequest.orderItems.map((item) =>
      convertToOrderItemEntity(item, orderEntity),
    )
    orderEntity.orderItems = order_items
    try {
      await this.orderRepository.save(orderEntity)
      // Clear the user's cart after successful order
      await this.cartFoodItemRepository.delete({ user_id: user.id })
      const combos = await this.cartComboRepository.find({
        where: { user_id: user.id },
        select: ['id'],
      })

      const comboIds = combos.map((c) => c.id)

      if (comboIds.length > 0) {
        await this.cartComboItemRepository.delete({
          cartCombo: In(comboIds),
        })
      }
      await this.cartComboRepository.delete({ user_id: user.id })
      return true
    } catch (e) {
      return false
    }
  }

  async getOrderByUserId(userId: number): Promise<OrderDto[]> {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderItems'],
    })
    const orderDtos = orders.map((order) => convertToOrderDto(order))
    return orderDtos
  }
}
