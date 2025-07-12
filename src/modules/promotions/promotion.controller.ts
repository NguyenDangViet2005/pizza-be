/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common'
import { PromotionDto } from '~/dto/promotion.dto'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { PromotionService } from '~/modules/promotions/promotion.service'

@Controller('promotions')
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}
  @Get()
  async getAllPromotions(): Promise<ResponseData<PromotionDto[]>> {
    const res = await this.promotionService.getAllPromotions()
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }
}
