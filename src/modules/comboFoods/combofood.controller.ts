/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common'
import { ComboFoodDTO } from '~/dto/comboFood.dto'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { ComboFoodService } from '~/modules/comboFoods/combofood.service'

@Controller('combo-foods')
export class ComboFoodController {
  constructor(private readonly comboFoodService: ComboFoodService) {}
  @Get()
  async getAllComboFoods(): Promise<ResponseData<ComboFoodDTO[]>> {
    const res = await this.comboFoodService.getAllComboFoods()
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }
}
