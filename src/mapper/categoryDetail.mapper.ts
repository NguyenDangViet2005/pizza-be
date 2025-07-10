import { CategoryDetailEntity } from '~/entities/categoryDetail.entity'
import { CategoryDetailDTO } from '~/dto/categoryDetail.dto'
import { convertToFoodDTO } from '~/mapper/food.mapper'

export function convertToCategoryDetailDTO(
  categoryDetail: CategoryDetailEntity,
): CategoryDetailDTO {
  return {
    id: categoryDetail.id,
    name: categoryDetail.name,
    foods: categoryDetail.foods.map((food) => convertToFoodDTO(food)),
  }
}
