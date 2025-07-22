/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PromotionCarouselBannerDto } from '~/dto/promotion-carousel-banner.dto'
import { PromotionDto } from '~/dto/promotion.dto'
import { FoodEntity, FoodSizeCrustEntity, PromotionEntity } from '~/entities'
import { convertToPromotionCarouselBannerDto } from '~/mapper/promotion.mapper'
import { convertPromotionEntityToDto } from '~/mapper/promotion.mapper'

@Injectable()
export class PromotionService {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
    @InjectRepository(FoodEntity)
    private readonly foodRepository: Repository<FoodEntity>,
    @InjectRepository(FoodSizeCrustEntity)
    private readonly foodSizeCrustRepository: Repository<FoodSizeCrustEntity>,
  ) {}

  async getAllPromotions(): Promise<PromotionDto[]> {
    const promotions = await this.promotionRepository.find({
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

  async getPromotionCarouselBanner(): Promise<PromotionCarouselBannerDto[]> {
    const promotions = await this.promotionRepository.find()
    return promotions.map((promotion) =>
      convertToPromotionCarouselBannerDto(promotion),
    )
  }

  async getPromotionBySlug(slug: string): Promise<PromotionDto> {
    const promotion = await this.promotionRepository.findOne({
      where: { slug },
      relations: [
        'combos',
        'combos.combo_items',
        'combos.combo_items.combo_item_options',
        'conditions',
      ],
    })
    if (!promotion) {
      throw new Error('Promotion not found')
    }
    return convertPromotionEntityToDto(
      promotion,
      this.foodRepository,
      this.foodSizeCrustRepository,
    )
  }
}
