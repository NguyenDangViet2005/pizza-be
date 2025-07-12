import { Repository } from 'typeorm'
import { PromotionDto } from '~/dto/promotion.dto'
import { FoodEntity, FoodSizeCrustEntity } from '~/entities'
import { PromotionEntity } from '~/entities/promotion.entity'
import { convertComboFoodToDTO } from '~/mapper/comboFood.mapper'

export const convertPromotionEntityToDto = async (
  promotion: PromotionEntity,
  foodRepo: Repository<FoodEntity>,
  fSCRepo: Repository<FoodSizeCrustEntity>,
): Promise<PromotionDto> => {
  const items = await Promise.all(
    promotion.combos.map((combo) =>
      convertComboFoodToDTO(combo, foodRepo, fSCRepo),
    ),
  )
  return {
    id: promotion.id,
    name: promotion.name,
    description: promotion.description,
    image: promotion.image,
    banner: promotion.banner,
    slug: promotion.slug,
    start_date: promotion.start_date,
    end_date: promotion.end_date,
    is_active: promotion.is_active,
    conditions: promotion.conditions?.map((condition) => condition.name),
    combos: items,
  }
}
