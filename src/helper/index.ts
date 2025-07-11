import { FoodEntity, FoodSizeCrustEntity } from '~/entities'
import { FoodDTO } from '~/dto/food.dto'
import { FoodSizeCrustDTO } from '~/dto/food-size-crust.dto'
import { Repository } from 'typeorm'

export const buildFoodDTOFromFSC = async (
  food_size_crust_id: number,
  foodRepo: Repository<FoodEntity>,
  fscRepo: Repository<FoodSizeCrustEntity>,
): Promise<FoodDTO | null> => {
  // Lấy food_id thông qua food_size_crust
  const fsc = await fscRepo.findOne({
    where: { id: food_size_crust_id },
    relations: ['food'], // để lấy được food.id
  })

  if (!fsc || !fsc.food) return null

  const foodId = fsc.food.id

  // Lấy thông tin food
  const food = await foodRepo.findOne({
    where: { id: foodId },
  })

  if (!food) return null

  // Lấy tất cả food_size_crust của food, kèm size và crust
  const allFSCs = await fscRepo.find({
    where: { food: { id: foodId } },
    relations: ['size', 'crust'],
  })

  const options: FoodSizeCrustDTO[] = allFSCs.map((item) => ({
    sizeId: item.size?.id || null,
    sizeName: item.size?.name || null,
    crustId: item.crust?.id || null,
    crustName: item.crust?.name || null,
    price: item.price,
    isDefault: item.is_default,
  }))

  return {
    id: food.id,
    name: food.name,
    description: food.description,
    image: food.image,
    options,
  }
}
