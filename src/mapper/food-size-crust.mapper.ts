import { FoodSizeCrustDTO } from '~/dto/food-size-crust.dto'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'

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
