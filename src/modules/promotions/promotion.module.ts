/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FoodEntity, FoodSizeCrustEntity, PromotionEntity } from '~/entities'
import { PromotionController } from '~/modules/promotions/promotion.controller'
import { PromotionService } from '~/modules/promotions/promotion.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PromotionEntity,
      FoodEntity,
      FoodSizeCrustEntity,
    ]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
})
export class PromotionModule {}
