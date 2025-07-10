import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CategoryDetailEntity } from '~/entities/categoryDetail.entity'

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @Column({ type: 'text' })
  icon: string

  @OneToMany(() => CategoryDetailEntity, (detail) => detail.category)
  categoryDetails: CategoryDetailEntity[]
}
