import { Controller, Get } from '@nestjs/common'
import { FoodService } from './food.service'
import { ResponseData } from 'src/global/ResponseData'
import { FoodEntity } from 'src/entities/food.entity'
import { HttpStatus, ResponseMessage } from 'src/global/ResponseEnum'

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}
  @Get()
  async findAllFoods(): Promise<ResponseData<FoodEntity[]>> {
    const res = await this.foodService.findAllFoods()
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }
}
