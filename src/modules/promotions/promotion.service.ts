/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PromotionDto } from '~/dto/promotion.dto'
import { FoodEntity, FoodSizeCrustEntity, PromotionEntity } from '~/entities'
import { convertPromotionEntityToDto } from '~/mapper/promotion.mapper'

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotiuonRepository: Repository<PromotionEntity>,
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    @InjectRepository(FoodSizeCrustEntity)
    private readonly foodSizeCrustRepository: Repository<FoodSizeCrustEntity>,
  ) {}

  async getAllPromotions(): Promise<PromotionDto[]> {
    const promotions = await this.promotiuonRepository.find({
      relations: [
        'combos',
        'combos.combo_items',
        'combos.combo_items.combo_item_options',
        'conditions',
      ],
    })
    const result = await Promise.all(
      promotions.map((promotion) =>
        convertPromotionEntityToDto(
          promotion,
          this.foodRepository,
          this.foodSizeCrustRepository,
        ),
      ),
    )
    return result
  }
}
