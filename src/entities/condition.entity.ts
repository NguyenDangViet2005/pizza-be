import { length } from 'class-validator'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PromotionEntity } from '~/entities/promotion.entity'

@Entity('condition')
export class ConditionEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @ManyToMany(() => PromotionEntity, (promotion) => promotion.conditions)
  promotions: PromotionEntity[]
}
