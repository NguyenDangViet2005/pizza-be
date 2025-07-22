import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { FoodEntity } from '~/entities/food.entity'
import { SizeEntity } from '~/entities/size.entity'
import { CrustEntity } from '~/entities/crust.entity'
import { CartFoodItemEntity } from '~/entities/cart-food-item.entity'
import { CartComboItemEntity } from '~/entities/cart-combo-item.entity'

@Entity('food_size_crust')
export class FoodSizeCrustEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => FoodEntity, (food) => food.foodSizeCrusts)
  @JoinColumn({ name: 'food_id' })
  food: FoodEntity

  @ManyToOne(() => SizeEntity, (size) => size.foodSizeCrusts)
  @JoinColumn({ name: 'size_id' })
  size: SizeEntity

  @ManyToOne(() => CrustEntity, (crust) => crust.foodSizeCrusts)
  @JoinColumn({ name: 'crust_id' })
  crust: CrustEntity

  @Column('double')
  price: number

  @Column({ default: false })
  is_default: boolean

  @OneToMany(
    () => CartFoodItemEntity,
    (cartFoodItem) => cartFoodItem.foodSizeCrust,
  )
  cartFoodItems: CartFoodItemEntity[]

  @OneToMany(
    () => CartComboItemEntity,
    (cartComboItem) => cartComboItem.foodSizeCrust,
  )
  cartComboItems: CartComboItemEntity[]
}
