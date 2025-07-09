import { FoodController } from 'src/modules/foods/food.controller'
import { FoodService } from './food.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { FoodEntity } from 'src/entities/food.entity'

@Module({
  imports: [TypeOrmModule.forFeature([FoodEntity])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
