import { FoodDTO } from '~/dto/food.dto'

export class ComboFoodItemOptionDTO {
  id: number

  is_default: boolean

  size_fixed: boolean

  food_size_crust_id?: number

  food: FoodDTO
}
