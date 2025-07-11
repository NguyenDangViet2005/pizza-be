/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Type } from 'class-transformer'
import { ComboFoodEntity, FoodEntity, FoodSizeCrustEntity } from '~/entities'
import { ComboFoodController } from '~/modules/comboFoods/combofood.controller'
import { ComboFoodService } from '~/modules/comboFoods/combofood.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ComboFoodEntity,
      FoodEntity,
      FoodSizeCrustEntity,
    ]),
  ],
  controllers: [ComboFoodController],
  providers: [ComboFoodService],
})
export class ComboFoodModule {}
