import { OrderModule } from './modules/order/order.module'
import { OrderService } from './modules/order/order.service'
import { OrderController } from './modules/order/order.controller'
import { RestaurantAddressService } from './modules/restaurantAddress/restaurantaddress.service'
import { RestaurantAddressModule } from './modules/restaurantAddress/restaurantaddress.module'
import { RestaurantAddressController } from './modules/restaurantAddress/restaurantaddress.controller'
import { CartModule } from './modules/cart/cart.module'
import { CartService } from './modules/cart/cart.service'
import { CartController } from './modules/cart/cart.controller'
import { AuthModule } from './modules/auth/auth.module'
import { AuthService } from './modules/auth/auth.service'
import { AuthController } from './modules/auth/auth.controller'
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
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), //không cần inject vào AuthService khi tạo token
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRES_IN'), //không cần inject vào AuthService khi tạo token
        },
      }),
      global: true,
      inject: [ConfigService], //không cần inject vào AuthService khi tạo token
    }),
    OrderModule,
    RestaurantAddressModule,
    AuthModule,
    PromotionModule,
    ComboFoodModule,
    CategoryModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    FoodModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
