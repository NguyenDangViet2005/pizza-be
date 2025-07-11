import { Repository } from 'typeorm'
import { ComboFoodItemOptionDTO } from '~/dto/comboFood-item-option.dto'
import { FoodDTO } from '~/dto/food.dto'
import { FoodEntity, FoodSizeCrustEntity } from '~/entities'
import { ComboFoodItemOptionEntity } from '~/entities/comboFood-item-option.entity'
import { buildFoodDTOFromFSC } from '~/helper'

export const convertComboFoodItemOPtionToDTO = async (
  comboItemOption: ComboFoodItemOptionEntity,
  foodRepo: Repository<FoodEntity>,
  fscRepo: Repository<FoodSizeCrustEntity>,
): Promise<ComboFoodItemOptionDTO> => {
  const foodDTO = await buildFoodDTOFromFSC(
    comboItemOption.food_size_crust_id,
    foodRepo,
    fscRepo,
  )
  return {
    id: comboItemOption.id,
    is_default: comboItemOption.is_default,
    size_fixed: comboItemOption.size_fixed,
    food_size_crust_id: comboItemOption.food_size_crust_id,
    food: foodDTO,
  }
}
