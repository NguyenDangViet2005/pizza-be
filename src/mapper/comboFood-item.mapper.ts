import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ComboFoodItemDTO } from '~/dto/comboFood-item.dto'
import { FoodEntity, FoodSizeCrustEntity } from '~/entities'
import { ComboFoodItemEntity } from '~/entities/comboFood-item.entity'
import { convertComboFoodItemOPtionToDTO } from '~/mapper/comboFood-item-option.mapper'

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
