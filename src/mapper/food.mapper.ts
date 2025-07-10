import { FoodEntity } from '~/entities/food.entity'
import { FoodDTO } from '~/dto/food.dto'
import { convertToFoodSizeCrustDTO } from '~/mapper/food-size-crust.mapper'

export function convertToFoodDTO(food: FoodEntity): FoodDTO {
  return {
    id: food.id,
    name: food.name,
    description: food.description,
    image: food.image,
    options: food.foodSizeCrusts.map((fsc) => convertToFoodSizeCrustDTO(fsc)),
  }
}
