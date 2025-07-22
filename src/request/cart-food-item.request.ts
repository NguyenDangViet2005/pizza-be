import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CartFoodItemRequest {
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

  @IsNumber()
  userId: number

  @IsNumber()
  totalPrice: number
}
