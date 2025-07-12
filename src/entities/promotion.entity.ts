import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm'
import { ComboFoodEntity } from '~/entities/comboFood.entity'
import { ConditionEntity } from '~/entities/condition.entity'

@Entity('promotion')
export class PromotionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 2000 })
  description: string

  @Column({ type: 'text' })
  image: string

  @Column({ type: 'text' })
  banner: string

  @Column({ type: 'varchar', length: 200 })
  slug: string

  @Column({ type: 'date' })
  start_date: Date

  @Column({ type: 'date' })
  end_date: Date

  @Column({ type: 'boolean', default: false })
  is_active: boolean

  @OneToMany(() => ComboFoodEntity, (cb) => cb.promotion)
  combos: ComboFoodEntity[]

  @ManyToMany(() => ConditionEntity, (condition) => condition.promotions)
  @JoinTable({
    name: 'condition_promotion',
    joinColumn: { name: 'promotion_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'condition_id', referencedColumnName: 'id' },
  })
  conditions: ConditionEntity[]
}
