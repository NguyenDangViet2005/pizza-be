import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
  @Column({ type: 'int' })
  categoryDetail_id: number
  @Column({ type: 'int' })
  category_id
}
