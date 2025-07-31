import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as Entities from '~/entities'
import { ConfigService } from '@nestjs/config'

export const typeOrmConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.get<string>('DB_HOST'),
  port: config.get<number>('DB_PORT'),
  username: config.get<string>('DB_USERNAME'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),
  entities: Object.values(Entities),
  synchronize: false,
  logging: true,
})
