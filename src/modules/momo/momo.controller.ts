import { Body, Controller, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ResponseData } from '~/global/ResponseData'
import { HttpStatus, ResponseMessage } from '~/global/ResponseEnum'
import { MomoService } from '~/modules/momo/momo.service'
import { OrderRequest } from '~/request/order.request'

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  // API để Frontend gọi, tạo URL thanh toán
  @Post('/create')
  async createPayment(
    @Body() orderRequest: OrderRequest,
  ): Promise<ResponseData<any>> {
    const res = await this.momoService.createPayment(orderRequest)
    return new ResponseData(HttpStatus.OK, ResponseMessage.SUCCESS, res)
  }

  // API IPN callback từ MoMo
  @Post('/ipn')
  async handleIpn(@Body() body: any, @Res() res: Response) {
    const isValid = this.momoService.verifySignature(body)
    console.log('is checked')

    if (!isValid) {
      return res.status(400).json({
        resultCode: 1,
        message: 'Invalid signature',
      })
    }
    if (body.resultCode === 0) {
      return res.status(200).json({
        resultCode: 0,
        message: 'Success',
      })
    } else {
      return res.status(200).json({
        resultCode: 1,
        message: 'Payment failed',
      })
    }
  }
}
