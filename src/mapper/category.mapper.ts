import { CategoryEntity } from '~/entities/category.entity'
import { CategoryDTO } from '~/dto/category.dto'
import { convertToCategoryDetailDTO } from '~/mapper/categoryDetail.mapper'

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
