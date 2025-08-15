import { length } from 'class-validator'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { UserEntity } from '~/entities/user.entity'
import { OrderEntity } from '~/entities/order.entity'

@Entity('orderItem')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity

  @Column({ type: 'varchar', length: 200 })
  foodName: string

  @Column({ type: 'varchar', length: 200 })
  foodImage: string

  @Column({ type: 'varchar', length: 200 })
  sizeName: string

  @Column({ type: 'varchar', length: 200 })
  crustName: string

  @Column()
  quantity: number

  @Column({ type: 'varchar', length: 200 })
  note: string

  @Column({ type: 'varchar', length: 200 })
  comboName: string
}
