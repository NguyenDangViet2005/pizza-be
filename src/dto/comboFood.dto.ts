import { ComboFoodItemDTO } from '~/dto/comboFood-item.dto'

export class ComboFoodDTO {
  id: number

  name: string

  description: string

  image: string

  combo_items: ComboFoodItemDTO[]
}
