import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('restaurant_address')
export class RestaurantAddressEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  address: string

  @Column()
  city: string

  @Column()
  ward: string

  @Column()
  phoneNumber: string
}
