import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { FoodEntity } from '~/entities/food.entity'
import { CategoryEntity } from '~/entities/category.entity'
import { CategoryDetailEntity } from '~/entities/categoryDetail.entity'
import { CrustEntity } from '~/entities/crust.entity'
import { SizeEntity } from '~/entities/size.entity'
import { FoodSizeCrustEntity } from '~/entities/food-size-crust.entity'
import * as Entities from '~/entities'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: Object.values(Entities),
  synchronize: false,
  logging: true,
}
