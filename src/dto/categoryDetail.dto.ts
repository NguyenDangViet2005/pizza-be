import { FoodDTO } from '~/dto/food.dto'

export class CategoryDetailDTO {
  id: number

  name: string

  foods: FoodDTO[]
}
