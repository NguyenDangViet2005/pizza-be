import { IsNumber, IsOptional, IsString } from 'class-validator'

export class OrderItemRequest {
  @IsString()
  foodName: string

  @IsString()
  foodImage: string

  @IsString()
  @IsOptional()
  sizeName: string | null

  @IsString()
  @IsOptional()
  crustName: string | null

  @IsNumber()
  quantity: number

  @IsString()
  @IsOptional()
  note: string | null

  @IsString()
  @IsOptional()
  comboName: string | null
}
