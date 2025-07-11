import { Controller, Get } from '@nestjs/common'
import { CategoryDTO } from '~/dto/category.dto'
import { CategorySimpleDTO } from '~/dto/categorySimple.dto'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { CategoryService } from '~/modules/categories/category.service'

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  async getAllCategories(): Promise<ResponseData<CategorySimpleDTO[]>> {
    const res = await this.categoryService.getAllCategories()
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }
}
