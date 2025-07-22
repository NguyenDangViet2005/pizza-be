import { FoodController } from '~/modules/foods/food.controller'
import { FoodService } from '~/modules/foods/food.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { CategoryDetailEntity, FoodEntity, CategoryEntity } from '~/entities'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FoodEntity,
      CategoryEntity,
      CategoryDetailEntity,
    ]),
  ],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
