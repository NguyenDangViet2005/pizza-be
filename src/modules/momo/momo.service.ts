import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { OrderRequest } from '~/request/order.request'
import axios from 'axios'
import * as crypto from 'crypto'

@Injectable()
export class MomoService {
  private readonly endpoint: string
  private readonly partnerCode: string
  private readonly accessKey: string
  private readonly secretKey: string
  private readonly redirectUrl: string
  private readonly ipnUrl: string

  constructor(private readonly configService: ConfigService) {
    this.endpoint = this.configService.get<string>('MOMO_ENDPOINT')
    this.partnerCode = this.configService.get<string>('MOMO_PARTNER_CODE')
    this.accessKey = this.configService.get<string>('MOMO_ACCESS_KEY')
    this.secretKey = this.configService.get<string>('MOMO_SECRET_KEY')
    this.redirectUrl = this.configService.get<string>('MOMO_REDIRECT_URL')
    this.ipnUrl = this.configService.get<string>('MOMO_IPN_URL')
  }

  async createPayment(order: OrderRequest): Promise<any> {
    const orderId = `${this.partnerCode}${Date.now()}`
    const requestId = orderId
    const orderInfo = 'Thanh toán qua MoMo'

    const rawSignature =
      `accessKey=${this.accessKey}` +
      `&amount=${order.total_price}` +
      `&extraData=` +
      `&ipnUrl=${this.ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${this.partnerCode}` +
      `&redirectUrl=${this.redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=payWithMethod`

    const signature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex')

    const body = {
      partnerCode: this.partnerCode,
      accessKey: this.accessKey,
      requestId,
      amount: order.total_price,
      orderId,
      orderInfo,
      redirectUrl: this.redirectUrl,
      ipnUrl: this.ipnUrl,
      extraData: '',
      requestType: 'payWithMethod',
      signature,
      lang: 'vi',
    }

    const response = await axios.post(this.endpoint, body)
    return response.data
  }

  verifySignature(ipnBody: any): boolean {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = ipnBody

    const rawSignature =
      `accessKey=${this.accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&message=${message}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&orderType=${orderType}` +
      `&partnerCode=${partnerCode}` +
      `&payType=${payType}` +
      `&requestId=${requestId}` +
      `&responseTime=${responseTime}` +
      `&resultCode=${resultCode}` +
      `&transId=${transId}`

    const expectedSignature = crypto
      .createHmac('sha256', this.secretKey)
      .update(rawSignature)
      .digest('hex')

    return expectedSignature === signature
  }
}
