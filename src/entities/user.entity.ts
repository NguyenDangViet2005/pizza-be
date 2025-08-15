import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderEntity } from '~/entities/order.entity'
import { RefreshTokenEntity } from '~/entities/refresh-token.entity'

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 200 })
  fullname: string

  @Column({ type: 'varchar', length: 100, unique: true })
  phoneNumber: string

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string

  @Column({ type: 'varchar', length: 100 })
  password: string

  @Column({ type: 'varchar', length: 200 })
  avatar: string

  @Column({ type: 'varchar', length: 200 })
  avatar_public_id: string

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshTokenEntity[]

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[]
}
