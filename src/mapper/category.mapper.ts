import { CategoryEntity } from '~/entities/category.entity'
import { CategoryDTO } from '~/dto/category.dto'
import { CategoryDetailEntity } from '~/entities'
import { CategoryDetailDTO } from '~/dto/categoryDetail.dto'
import { CategorySimpleDTO } from '~/dto/categorySimple.dto'
import { convertToFoodDTO } from '~/mapper/food.mapper'

export function convertToCategoryDTO(category: CategoryEntity): CategoryDTO {
  return {
    id: category.id,
    name: category.name,
    icon: category.icon,
    categoryDetails: category.categoryDetails.map((detail) =>
      convertToCategoryDetailDTO(detail),
    ),
  }
}

export function convertToCategoryDetailDTO(
  categoryDetail: CategoryDetailEntity,
): CategoryDetailDTO {
  return {
    id: categoryDetail.id,
    name: categoryDetail.name,
    foods: categoryDetail.foods.map((food) => convertToFoodDTO(food)),
  }
}

export const convertToCategorySimpleDTO = (
  category: CategoryEntity,
): CategorySimpleDTO => {
  return {
    id: category.id,
    name: category.name,
    icon: category.icon,
  }
}
