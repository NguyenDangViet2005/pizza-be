import { FoodModule } from './modules/foods/food.module'
import { FoodController } from './modules/foods/food.controller'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { FoodEntity } from 'src/entities/food.entity'

@Module({
  imports: [
    FoodModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'pizzacompany',
      entities: [FoodEntity],
      synchronize: false,
      logging: true,
    }),
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
