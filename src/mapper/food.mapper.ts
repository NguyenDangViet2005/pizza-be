import { FoodEntity } from '~/entities/food.entity'
import { FoodDTO } from '~/dto/food.dto'

export function convertToFoodDTO(food: FoodEntity): FoodDTO {
  return {
    id: food.id,
    name: food.name,
    description: food.description,
    image: food.image,
  }
}
