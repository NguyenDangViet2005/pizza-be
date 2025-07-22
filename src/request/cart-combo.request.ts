import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'
import { CartComboItemRequest } from '~/request/cart-combo-item.request'

export class CartComboRequest {
  @IsNumber()
  comboId: number

  @IsArray()
  @IsNotEmpty()
  items: CartComboItemRequest[]

  @IsNumber()
  quantity: number

  @IsNumber()
  userId: number

  @IsNumber()
  totalPrice: number
}
