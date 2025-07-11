import { length } from 'class-validator'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { ComboFoodItemEntity } from '~/entities/comboFood-item.entity'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'

@Entity('combo_item_option')
export class ComboFoodItemOptionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(
    () => ComboFoodItemEntity,
    (comboItem) => comboItem.combo_item_options,
  )
  @JoinColumn({ name: 'combo_item_id' })
  combo_item_option: ComboFoodItemEntity

  @Column({ name: 'food_size_crust_id' })
  food_size_crust_id: number

  @Column({ type: 'boolean', default: false })
  is_default: boolean

  @Column({ type: 'boolean' })
  size_fixed: boolean
}
