import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
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

  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshTokens: RefreshTokenEntity[]
}
