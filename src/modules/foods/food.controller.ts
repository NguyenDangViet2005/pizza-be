import { Controller, Get } from '@nestjs/common'
import { FoodService } from '~/modules/foods/food.service'
import { ResponseData } from '~/global/ResponseData'
import { FoodEntity } from '~/entities/food.entity'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { CategoryDTO } from '~/dto/category.dto'

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('')
  async getAllFoodByCategory(): Promise<ResponseData<CategoryDTO[]>> {
    const res = await this.foodService.getAllFoodByCategory()
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }
}
