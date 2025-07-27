import { CartComboItemDTO } from '~/dto/cart-combo-item.dto'

export class CartComboDTO {
  id: string

  comboName: string

  comboImage: string

  items: CartComboItemDTO[]

  quantity: number

  totalPrice: number
}
