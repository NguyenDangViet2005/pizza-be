import { FoodSizeCrustDTO } from '~/dto/food-size-crust.dto'

export class FoodDTO {
  id: number

  name: string

  description: string

  image: string

  options: FoodSizeCrustDTO[]
}
