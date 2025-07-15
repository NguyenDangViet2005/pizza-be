import { PromotionCarouselBannerDto } from '~/dto/promotion-carousel-banner.dto'
import { PromotionEntity } from '~/entities'

export const convertToPromotionCarouselBannerDto = (
  promotion: PromotionEntity,
): PromotionCarouselBannerDto => {
  return {
    id: promotion.id,
    name: promotion.name,
    banner: promotion.banner,
    slug: promotion.slug,
    is_active: promotion.is_active,
  }
}
