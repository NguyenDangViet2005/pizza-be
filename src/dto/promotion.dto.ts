import { ComboFoodDTO } from '~/dto/comboFood.dto'

export class PromotionDto {
  id: number
  name: string
  description: string
  image: string
  banner: string
  slug: string
  start_date: Date
  end_date: Date
  is_active: boolean
  conditions?: string[]
  combos: ComboFoodDTO[]
}
