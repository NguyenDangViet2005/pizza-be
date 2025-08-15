import { length } from 'class-validator'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderItemEntity } from '~/entities/orderItem.entity'
import { UserEntity } from '~/entities/user.entity'

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'user_Id' })
  user: UserEntity

  @Column({ type: 'varchar', length: 200 })
  customer_name: string

  @Column({ type: 'varchar', length: 20 })
  customer_phoneNumber: string

  @Column({ type: 'varchar', length: 200 })
  restaurant_address_name: string

  @Column({ type: 'varchar', length: 200 })
  user_address: string

  @Column()
  order_method: string

  @Column()
  order_status: string

  @Column()
  payment_method: string

  @Column()
  payment_status: string

  @Column()
  order_date: Date

  @Column()
  receive_time: Date

  @Column()
  total_price: number

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.order, {
    cascade: true,
  })
  orderItems: OrderItemEntity[]
}
