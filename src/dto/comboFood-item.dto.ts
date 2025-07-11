import { ComboFoodItemOptionDTO } from '~/dto/comboFood-item-option.dto'

export class ComboFoodItemDTO {
  id: number

  category_name: string

  required_quantity: number

  quantity: number

  combo_food_options: ComboFoodItemOptionDTO[]
}
