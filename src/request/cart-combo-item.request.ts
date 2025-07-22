import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { CartFoodItemDTO } from '~/dto/cart-food-item.dto'

export class CartComboItemRequest {
  @IsNumber()
  comboItemId: number

  @IsNumber()
  foodId: number

  @IsOptional()
  @IsNumber()
  sizeId: number

  @IsOptional()
  @IsNumber()
  crustId: number

  @IsString()
  note: string

  @IsNumber()
  quantity: number
}
