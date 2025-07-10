import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm'
import { CategoryEntity } from '~/entities/category.entity'
import { FoodEntity } from '~/entities/food.entity'

@Entity('categoryDetail')
export class CategoryDetailEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @ManyToOne(() => CategoryEntity, (category) => category.categoryDetails)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @OneToMany(() => FoodEntity, (food) => food.categoryDetail)
  foods: FoodEntity[]
}
