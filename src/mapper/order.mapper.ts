import { OrderDto } from '~/dto/order.dto'
import { OrderItemDto } from '~/dto/orderItem.dto'
import { OrderEntity, OrderItemEntity, UserEntity } from '~/entities'
import { OrderRequest } from '~/request/order.request'
import { OrderItemRequest } from '~/request/orderItem.Request'

export const convertToOrderEntity = (
  orderRequest: OrderRequest,
  user: UserEntity,
): OrderEntity => {
  const newOrderEntity = new OrderEntity()
  newOrderEntity.user = user
  newOrderEntity.customer_name = orderRequest.customer_name
  newOrderEntity.customer_phoneNumber = orderRequest.customer_phoneNumber
  newOrderEntity.order_method = orderRequest.order_method
  newOrderEntity.order_date = orderRequest.order_date
  newOrderEntity.order_status = 'Chưa giao hàng'
  newOrderEntity.payment_method = orderRequest.payment_method
  newOrderEntity.payment_status = orderRequest.payment_status
  newOrderEntity.receive_time = orderRequest.receive_time
  newOrderEntity.restaurant_address_name = orderRequest.restaurant_address_name
  newOrderEntity.total_price = orderRequest.total_price
  return newOrderEntity
}

export const convertToOrderItemEntity = (
  orderItemRequest: OrderItemRequest,
  orderEntity: OrderEntity,
): OrderItemEntity => {
  const newOrderItemEntity = new OrderItemEntity()
  newOrderItemEntity.foodName = orderItemRequest.foodName
  newOrderItemEntity.foodImage = orderItemRequest.foodImage
  newOrderItemEntity.sizeName = orderItemRequest.sizeName
  newOrderItemEntity.crustName = orderItemRequest.crustName
  newOrderItemEntity.note = orderItemRequest.note
  newOrderItemEntity.quantity = orderItemRequest.quantity
  newOrderItemEntity.comboName = orderItemRequest.comboName
  newOrderItemEntity.order = orderEntity
  return newOrderItemEntity
}

export const convertToOrderDto = (orderEntity: OrderEntity): OrderDto => {
  const orderDto = new OrderDto()
  orderDto.customer_name = orderEntity.customer_name
  orderDto.customer_phoneNumber = orderEntity.customer_phoneNumber
  orderDto.restaurant_address_name = orderEntity.restaurant_address_name
  orderDto.user_address = orderEntity.user_address
  orderDto.order_method = orderEntity.order_method
  orderDto.order_status = orderEntity.order_status
  orderDto.payment_method = orderEntity.payment_method
  orderDto.payment_status = orderEntity.payment_status
  orderDto.order_date = orderEntity.order_date
  orderDto.receive_time = orderEntity.receive_time
  orderDto.total_price = orderEntity.total_price
  orderDto.orderItems = orderEntity.orderItems.map((item) =>
    convertToOrderItemDto(item),
  )
  return orderDto
}

export const convertToOrderItemDto = (
  orderItemEntity: OrderItemEntity,
): OrderItemDto => {
  const orderItemDto = new OrderItemDto()
  orderItemDto.foodName = orderItemEntity.foodName
  orderItemDto.foodImage = orderItemEntity.foodImage
  orderItemDto.sizeName = orderItemEntity.sizeName
  orderItemDto.crustName = orderItemEntity.crustName
  orderItemDto.quantity = orderItemEntity.quantity
  orderItemDto.note = orderItemEntity.note
  orderItemDto.comboName = orderItemEntity.comboName
  return orderItemDto
}
