import { Injectable, Res } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryDTO } from '~/dto/category.dto'
import { CategoryEntity } from '~/entities/category.entity'
import { FoodEntity } from '~/entities/food.entity'
import { convertToCategoryDTO } from '~/mapper/category.mapper'

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAllFoodByCategory(): Promise<CategoryDTO[]> {
    const categoryEntities = await this.categoryRepository.find({
      relations: [
        'categoryDetails',
        'categoryDetails.foods',
        'categoryDetails.foods.foodSizeCrusts',
        'categoryDetails.foods.foodSizeCrusts.size',
        'categoryDetails.foods.foodSizeCrusts.crust',
      ],
    })
    return categoryEntities.map((category) => convertToCategoryDTO(category))
  }
}
