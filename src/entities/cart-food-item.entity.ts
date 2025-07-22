import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'

@Entity('cart_food_item')
export class CartFoodItemEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  user_id: number

  @ManyToOne(
    () => FoodSizeCrustEntity,
    (foodSizeCrust) => foodSizeCrust.cartFoodItems,
  )
  @JoinColumn({ name: 'food_size_crust_id' })
  foodSizeCrust: FoodSizeCrustEntity

  @Column()
  quantity: number

  @Column({ type: 'varchar', length: 500 })
  note: string

  @Column()
  totalPrice: number
}
