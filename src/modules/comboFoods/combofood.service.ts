/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ComboFoodDTO } from '~/dto/comboFood.dto'
import { FoodEntity, FoodSizeCrustEntity } from '~/entities'
import { ComboFoodEntity } from '~/entities/comboFood.entity'
import { convertComboFoodToDTO } from '~/mapper/comboFood.mapper'

@Injectable()
export class ComboFoodService {
  constructor(
    @InjectRepository(ComboFoodEntity)
    private readonly comboFoodRepository: Repository<ComboFoodEntity>,
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    @InjectRepository(FoodSizeCrustEntity)
    private readonly foodSizeCrustRepository: Repository<FoodSizeCrustEntity>,
  ) {}

  async getAllComboFoods(): Promise<ComboFoodDTO[]> {
    const res = await this.comboFoodRepository.find({
      relations: ['combo_items', 'combo_items.combo_item_options'],
    })
    const result = await Promise.all(
      res.map((comboFood) =>
        convertComboFoodToDTO(
          comboFood,
          this.foodRepository,
          this.foodSizeCrustRepository,
        ),
      ),
    )
    return result
  }
}
