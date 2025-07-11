import { CategorySimpleDTO } from '~/dto/categorySimple.dto'
import { CategoryEntity } from '~/entities'

export const convertToCategorySimpleDTO = (
  category: CategoryEntity,
): CategorySimpleDTO => {
  return {
    id: category.id,
    name: category.name,
    icon: category.icon,
  }
}
