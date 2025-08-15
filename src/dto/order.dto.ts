import { OrderItemDto } from '~/dto/orderItem.dto'

export class OrderDto {
  customer_name: string
  customer_phoneNumber: string
  restaurant_address_name: string | null
  user_address: string | null
  order_method: string
  order_status: string
  payment_method: string
  payment_status: string
  order_date: Date
  receive_time: Date
  total_price: number
  orderItems: OrderItemDto[]
}
