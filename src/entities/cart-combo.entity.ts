import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CartComboItemEntity } from '~/entities/cart-combo-item.entity'
import { ComboFoodEntity } from '~/entities/comboFood.entity'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'

@Entity('cart_combo')
export class CartComboEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @ManyToOne(() => ComboFoodEntity, (comboFood) => comboFood.cartCombos)
  @JoinColumn({ name: 'comboFood_id' })
  comboFood: ComboFoodEntity

  @Column()
  quantity: number

  @Column()
  totalPrice: number

  @OneToMany(
    () => CartComboItemEntity,
    (cartComboItem) => cartComboItem.cartCombo,
  )
  cartComboItems: CartComboItemEntity[]
}
