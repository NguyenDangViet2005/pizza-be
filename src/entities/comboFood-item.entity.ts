import { length } from 'class-validator'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CartComboItemEntity } from '~/entities/cart-combo-item.entity'
import { ComboFoodItemOptionEntity } from '~/entities/comboFood-item-option.entity'
import { ComboFoodEntity } from '~/entities/comboFood.entity'

@Entity('combo_item')
export class ComboFoodItemEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  category_name: string

  @Column({ type: 'int' })
  required_quantity: number

  @Column({ type: 'int' })
  quantity: number

  @ManyToOne(() => ComboFoodEntity, (comboFood) => comboFood.combo_items)
  @JoinColumn({ name: 'comboFood_id' })
  combo_food: ComboFoodEntity

  @OneToMany(
    () => ComboFoodItemOptionEntity,
    (option) => option.combo_item_option,
  )
  combo_item_options: ComboFoodItemOptionEntity[]

  @OneToMany(() => CartComboItemEntity, (item) => item.comboItem)
  cartComboItems: CartComboItemEntity[]
}
