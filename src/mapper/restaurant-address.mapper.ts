import { RestaurantAddressDto } from '~/dto/restaurantAddress.dto'
import { RestaurantAddressEntity } from '~/entities/restaurantAddress.entity'

export const convertRestaurantAddressToDto = (
  restaurantAddress: RestaurantAddressEntity,
): RestaurantAddressDto => {
  return {
    name: restaurantAddress.name,
    address: restaurantAddress.address,
    city: restaurantAddress.city,
    ward: restaurantAddress.ward,
    phoneNumber: restaurantAddress.phoneNumber,
  }
}
