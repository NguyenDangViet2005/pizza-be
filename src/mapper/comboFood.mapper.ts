import { Repository } from 'typeorm'
import { ComboFoodDTO } from '~/dto/comboFood.dto'
import { FoodEntity, FoodSizeCrustEntity } from '~/entities'
import { ComboFoodEntity } from '~/entities/comboFood.entity'
import { convertComboItemToDTO } from '~/mapper/comboFood-item.mapper'

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
