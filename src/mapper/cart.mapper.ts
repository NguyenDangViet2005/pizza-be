import { Repository } from 'typeorm'
import { CartComboItemDTO } from '~/dto/cart-combo-item.dto'
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
import { CartComboItemRequest } from '~/request/cart-combo-item.request'
import { CartComboRequest } from '~/request/cart-combo.request'
import { CartFoodItemRequest } from '~/request/cart-food-item.request'

//mapper requests to entities
export const convertCartFoodRequestToEntity = async (
  request: CartFoodItemRequest,
  fscRepository: Repository<FoodSizeCrustEntity>,
  userRepository: Repository<UserEntity>,
): Promise<CartFoodItemEntity> => {
  const user = await userRepository.findOne({ where: { id: request.userId } })
  if (!user) {
    throw new Error('không tìm thấy người dùng')
  }
  const foodEntity = new CartFoodItemEntity()
  foodEntity.user_id = request.userId
  foodEntity.foodSizeCrust = await fscRepository.findOne({
    where: {
      food: { id: request.foodId },
      size: { id: request.sizeId },
      crust: { id: request.crustId },
    },
    relations: ['food', 'size', 'crust'],
  })
  foodEntity.quantity = request.quantity
  foodEntity.note = request.note
  foodEntity.totalPrice = request.totalPrice
  return foodEntity
}

export const convertCartComboRequestToEntity = async (
  request: CartComboRequest,
  userRepository: Repository<UserEntity>,
  comboRepository: Repository<ComboFoodEntity>,
): Promise<CartComboEntity> => {
  const user = await userRepository.findOne({ where: { id: request.userId } })
  if (!user) {
    throw new Error('không tìm thấy người dùng')
  }
  const cartComboEntity = new CartComboEntity()
  cartComboEntity.user_id = request.userId
  const comboFood = await comboRepository.findOne({
    where: { id: request.comboId },
  })
  if (!comboFood) {
    throw new Error('không tìm thấy combo')
  }
  cartComboEntity.comboFood = comboFood
  cartComboEntity.quantity = request.quantity
  cartComboEntity.totalPrice = request.totalPrice
  return cartComboEntity
}

export const convertCartComboItemRequestToEntity = async (
  request: CartComboItemRequest,
  fscRepository: Repository<FoodSizeCrustEntity>,
  comboItemRepository: Repository<ComboFoodItemEntity>,
  cartComboEntity: CartComboEntity,
): Promise<CartComboItemEntity> => {
  const cartComboItemEntity = new CartComboItemEntity()
  const comboItemEntity = await comboItemRepository.findOne({
    where: { id: request.comboItemId },
  })
  if (!comboItemEntity) {
    throw new Error('không tìm thấy combo item')
  }
  cartComboItemEntity.cartCombo = cartComboEntity
  cartComboItemEntity.foodSizeCrust = await fscRepository.findOne({
    where: {
      food: { id: request.foodId },
      size: { id: request.sizeId },
      crust: { id: request.crustId },
    },
    relations: ['food', 'size', 'crust'],
  })
  cartComboItemEntity.quantity = request.quantity
  cartComboItemEntity.note = request.note
  return cartComboItemEntity
}

//mapper entities to DTOs
export const convertCartFoodItemEntityToDTO = (
  entity: CartFoodItemEntity,
): CartFoodItemDTO => {
  const dto = new CartFoodItemDTO()
  dto.foodName = entity.foodSizeCrust.food.name
  dto.foodImage = entity.foodSizeCrust.food.image
  dto.sizeName = entity.foodSizeCrust?.size?.name
  dto.crustName = entity.foodSizeCrust?.crust?.name
  dto.note = entity.note
  dto.quantity = entity.quantity
  dto.totalPrice = entity.totalPrice
  return dto
}

export const convertCartComboEntityToDTO = (
  entity: CartComboEntity,
): CartComboDTO => {
  const dto = new CartComboDTO()
  dto.comboName = entity.comboFood.name
  dto.comboImage = entity.comboFood.image
  dto.items = entity.cartComboItems.map((item) =>
    convertCartComboItemEntityToDTO(item),
  )
  dto.quantity = entity.quantity
  dto.totalPrice = entity.totalPrice
  return dto
}

export const convertCartComboItemEntityToDTO = (
  entity: CartComboItemEntity,
): CartComboItemDTO => {
  const dto = new CartComboItemDTO()
  dto.foodName = entity.foodSizeCrust.food.name
  dto.foodImage = entity.foodSizeCrust.food.image
  dto.sizeName = entity.foodSizeCrust?.size?.name
  dto.crustName = entity.foodSizeCrust?.crust?.name
  dto.note = entity.note
  dto.quantity = entity.quantity
  return dto
}
