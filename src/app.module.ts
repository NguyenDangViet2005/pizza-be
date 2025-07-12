import { PromotionModule } from './modules/promotions/promotion.module'
import { PromotionService } from './modules/promotions/promotion.service'
import { PromotionController } from './modules/promotions/promotion.controller'
import { ComboFoodService } from './modules/comboFoods/combofood.service'
import { ComboFoodModule } from './modules/comboFoods/combofood.module'
import { ComboFoodController } from './modules/comboFoods/combofood.controller'
import { CategoryModule } from '~/modules/categories/category.module'
import { CategoryService } from '~/modules/categories/category.service'
import { CategoryController } from '~/modules/categories/category.controller'
import { FoodModule } from '~/modules/foods/food.module'
import { FoodController } from '~/modules/foods/food.controller'
import { Module } from '@nestjs/common'
import { AppController } from '~/app.controller'
import { AppService } from '~/app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import { FoodEntity } from '~/entities/food.entity'
import { typeOrmConfig } from '~/config/database.config'

@Module({
  imports: [
    PromotionModule,
    ComboFoodModule,
    CategoryModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    FoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
