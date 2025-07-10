import { CategoryDetailDTO } from '~/dto/categoryDetail.dto'

export class CategoryDTO {
  id: number

  name: string

  icon: string

  categoryDetails: CategoryDetailDTO[]
}
