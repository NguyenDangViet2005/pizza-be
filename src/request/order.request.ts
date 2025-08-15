import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'
import { OrderItemRequest } from '~/request/orderItem.Request'

export class OrderRequest {
  @IsString()
  @MinLength(2, { message: 'Tên khách hàng phải có ít nhất 2 ký tự' })
  customer_name: string

  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Số điện thoại phải là 10 ký tự',
  })
  customer_phoneNumber: string

  @IsString()
  @IsOptional()
  restaurant_address_name: string | null

  @IsString()
  @IsOptional()
  user_address: string | null

  @IsString()
  order_method: string

  @IsString()
  payment_method: string

  @IsString()
  payment_status: string

  @IsDate({ message: 'Ngày đặt hàng phải đúng định dạng' })
  order_date: Date

  @IsDate({ message: 'Ngày đặt hàng phải đúng định dạng' })
  receive_time: Date

  @IsNumber({}, { message: 'Tổng tiền phải là số' })
  @IsPositive({ message: 'Tổng tiền phải lớn hơn 0' })
  total_price: number

  @IsArray()
  orderItems: OrderItemRequest[]
}
