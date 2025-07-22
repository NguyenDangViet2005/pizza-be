/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CartComboDTO } from '~/dto/cart-combo.dto'
import { CartFoodItemDTO } from '~/dto/cart-food-item.dto'
import {
  ComboFoodEntity,
  ComboFoodItemEntity,
  FoodSizeCrustEntity,
  UserEntity,
} from '~/entities'
import { CartComboItemEntity } from '~/entities/cart-combo-item.entity'
import { CartComboEntity } from '~/entities/cart-combo.entity'
import { CartFoodItemEntity } from '~/entities/cart-food-item.entity'
import {
  convertCartComboEntityToDTO,
  convertCartComboItemRequestToEntity,
  convertCartComboRequestToEntity,
  convertCartFoodItemEntityToDTO,
  convertCartFoodRequestToEntity,
} from '~/mapper/cart.mapper'
import { CartComboRequest } from '~/request/cart-combo.request'
import { CartFoodItemRequest } from '~/request/cart-food-item.request'

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartFoodItemEntity)
    private readonly cartFoodItemRepository: Repository<CartFoodItemEntity>,
    @InjectRepository(FoodSizeCrustEntity)
    private readonly foodSizeCrustRepository: Repository<FoodSizeCrustEntity>,
    @InjectRepository(CartComboEntity)
    private readonly cartComboRepository: Repository<CartComboEntity>,
    @InjectRepository(CartComboItemEntity)
    private readonly cartComboItemRepository: Repository<CartComboItemEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ComboFoodItemEntity)
    private readonly comboItemRepository: Repository<ComboFoodItemEntity>,
    @InjectRepository(ComboFoodEntity)
    private readonly comboRepository: Repository<ComboFoodEntity>,
  ) {}
  async addFoodToCart(cartFoodRequest: CartFoodItemRequest): Promise<boolean> {
    try {
      const cartFoodItem = await convertCartFoodRequestToEntity(
        cartFoodRequest,
        this.foodSizeCrustRepository,
        this.userRepository,
      )
      await this.cartFoodItemRepository.save(cartFoodItem)
      return true
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async addComboToCart(cartComboDTO: CartComboRequest): Promise<boolean> {
    try {
      const cartComboEntity = await convertCartComboRequestToEntity(
        cartComboDTO,
        this.userRepository,
        this.comboRepository,
      )
      const savedCombo = await this.cartComboRepository.save(cartComboEntity)
      for (const item of cartComboDTO.items) {
        const cartComboItemEntity = await convertCartComboItemRequestToEntity(
          item,
          this.foodSizeCrustRepository,
          this.comboItemRepository,
          savedCombo,
        )
        await this.cartComboItemRepository.save(cartComboItemEntity)
      }
      return true
    } catch (error) {
      return false
    }
  }
  async getCart(userId: number): Promise<any> {
    const user = await this.userRepository.findOne({ where: { id: userId } })
    if (!user) {
      throw new Error('User không tồn tại')
    }
    try {
      const cartFoodItems = await this.cartFoodItemRepository.find({
        where: { user_id: userId },
        relations: [
          'foodSizeCrust',
          'foodSizeCrust.food',
          'foodSizeCrust.size',
          'foodSizeCrust.crust',
        ],
      })
      const cartCombos = await this.cartComboRepository.find({
        where: { user_id: userId },
        relations: [
          'comboFood',
          'cartComboItems',
          'cartComboItems.comboItem',
          'cartComboItems.foodSizeCrust',
          'cartComboItems.foodSizeCrust.food',
          'cartComboItems.foodSizeCrust.size',
          'cartComboItems.foodSizeCrust.crust',
        ],
      })
      const foods = cartFoodItems.map((item) =>
        convertCartFoodItemEntityToDTO(item),
      )
      const combos = cartCombos.map((combo) =>
        convertCartComboEntityToDTO(combo),
      )
      return {
        userId,
        foods,
        combos,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
