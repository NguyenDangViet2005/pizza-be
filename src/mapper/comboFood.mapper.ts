import { Repository } from 'typeorm'
import { ComboFoodItemOptionDTO } from '~/dto/comboFood-item-option.dto'
import { ComboFoodItemDTO } from '~/dto/comboFood-item.dto'
import { ComboFoodDTO } from '~/dto/comboFood.dto'
import {
  ComboFoodItemEntity,
  ComboFoodItemOptionEntity,
  FoodEntity,
  FoodSizeCrustEntity,
} from '~/entities'
import { ComboFoodEntity } from '~/entities/comboFood.entity'
import { buildFoodDTOFromFSC } from '~/helper'

export const convertComboFoodToDTO = async (
  comboFood: ComboFoodEntity,
  foodRepo: Repository<FoodEntity>,
  fscRepo: Repository<FoodSizeCrustEntity>,
): Promise<ComboFoodDTO> => {
  const items = await Promise.all(
    comboFood.combo_items.map((item) =>
      convertComboItemToDTO(item, foodRepo, fscRepo),
    ),
  )
  return {
    id: comboFood.id,
    name: comboFood.name,
    description: comboFood.description,
    image: comboFood.image,
    combo_items: items,
  }
}

export const convertComboItemToDTO = async (
  comboItem: ComboFoodItemEntity,
  foodRepo: Repository<FoodEntity>,
  fscRepo: Repository<FoodSizeCrustEntity>,
): Promise<ComboFoodItemDTO> => {
  const options = await Promise.all(
    comboItem.combo_item_options.map((option) =>
      convertComboFoodItemOPtionToDTO(option, foodRepo, fscRepo),
    ),
  )
  return {
    id: comboItem.id,
    category_name: comboItem.category_name,
    required_quantity: comboItem.required_quantity,
    quantity: comboItem.quantity,
    combo_food_options: options,
  }
}

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
