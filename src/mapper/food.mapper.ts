import { FoodEntity } from '~/entities/food.entity'
import { FoodDTO } from '~/dto/food.dto'
import { FoodSizeCrustEntity } from '~/entities'
import { FoodSizeCrustDTO } from '~/dto/food-size-crust.dto'

export function convertToFoodDTO(food: FoodEntity): FoodDTO {
  return {
    id: food.id,
    name: food.name,
    description: food.description,
    image: food.image,
    options: food.foodSizeCrusts.map((fsc) => convertToFoodSizeCrustDTO(fsc)),
  }
}

export const convertToFoodSizeCrustDTO = (
  foodSizeCrust: FoodSizeCrustEntity,
): FoodSizeCrustDTO => {
  return {
    sizeId: foodSizeCrust.size?.id ?? null,
    sizeName: foodSizeCrust.size?.name ?? null,
    crustId: foodSizeCrust.crust?.id ?? null,
    crustName: foodSizeCrust.crust?.name ?? null,
    price: foodSizeCrust.price,
    isDefault: foodSizeCrust.is_default,
  }
}
