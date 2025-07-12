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
import { PromotionEntity } from '~/entities/promotion.entity'

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

  @OneToMany(() => ComboFoodItemEntity, (comboItem) => comboItem.combo_food)
  combo_items: ComboFoodItemEntity[]

  @ManyToOne(() => PromotionEntity, (promotion) => promotion.combos)
  @JoinColumn({ name: 'promotion_id' })
  promotion: PromotionEntity
}
