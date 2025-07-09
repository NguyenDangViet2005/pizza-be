import { Injectable, Res } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FoodEntity } from '../../entities/food.entity'

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
  ) {}

  async findAllFoods(): Promise<FoodEntity[]> {
    return await this.foodRepository.find()
  }
}
