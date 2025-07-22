import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CartComboEntity } from '~/entities/cart-combo.entity'
import { ComboFoodItemEntity } from '~/entities/comboFood-item.entity'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'
import { UserEntity } from '~/entities/user.entity'

@Entity('cart_combo_item')
export class CartComboItemEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => CartComboEntity, (cartCombo) => cartCombo.cartComboItems)
  @JoinColumn({ name: 'cart_combo_id' })
  cartCombo: CartComboEntity

  @ManyToOne(() => ComboFoodItemEntity, (item) => item.cartComboItems)
  @JoinColumn({ name: 'combo_item_id' })
  comboItem: ComboFoodItemEntity

  @ManyToOne(() => FoodSizeCrustEntity, (fsc) => fsc.cartComboItems)
  @JoinColumn({ name: 'food_size_crust_id' })
  foodSizeCrust: FoodSizeCrustEntity

  @Column()
  quantity: number

  @Column()
  note: string
}
