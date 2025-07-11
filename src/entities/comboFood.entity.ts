import { length } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ComboFoodItemEntity } from '~/entities/comboFood-item.entity'

@Entity('comboFood')
export class ComboFoodEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 1000 })
  description: string

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'int' })
  promotion_id: number

  @OneToMany(() => ComboFoodItemEntity, (comboItem) => comboItem.combo_food)
  combo_items: ComboFoodItemEntity[]
}
