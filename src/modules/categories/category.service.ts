import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategorySimpleDTO } from '~/dto/categorySimple.dto'
import { CategoryEntity } from '~/entities'
import {
  convertToCategoryDTO,
  convertToCategorySimpleDTO,
} from '~/mapper/category.mapper'

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  async getAllCategories(): Promise<CategorySimpleDTO[]> {
    const res = await this.categoryRepository.find()
    return res.map((category) => convertToCategorySimpleDTO(category))
  }
}
