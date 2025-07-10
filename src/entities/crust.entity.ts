import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'

@Entity('crust')
export class CrustEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 100 })
  name: string

  @OneToMany(() => FoodSizeCrustEntity, (fsc) => fsc.crust)
  foodSizeCrusts: FoodSizeCrustEntity[]
}
