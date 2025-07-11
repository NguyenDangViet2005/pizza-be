import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Type } from 'class-transformer'
import { CategoryEntity } from '~/entities'
import { CategoryController } from '~/modules/categories/category.controller'
import { CategoryService } from '~/modules/categories/category.service'

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
