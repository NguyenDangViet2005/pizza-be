import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm'
import { CategoryDetailEntity } from '~/entities/categoryDetail.entity'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'

@Entity('food')
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'varchar', length: 1000 })
  description: string

  @Column({ type: 'text' })
  image: string

  @ManyToOne(() => CategoryDetailEntity, (detail) => detail.foods, {
    nullable: true,
  })
  @JoinColumn({ name: 'categoryDetail_id' })
  categoryDetail: CategoryDetailEntity

  @OneToMany(() => FoodSizeCrustEntity, (fsc) => fsc.food)
  foodSizeCrusts: FoodSizeCrustEntity[]
}
