import * as nodemailer from 'nodemailer'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserEntity } from '~/entities'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderRequest } from '~/request/order.request'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly config: ConfigService,
  ) {}
  // Hàm gửi email xác thực
  async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // hoặc SMTP server của bạn
      auth: {
        user: this.config.get<string>('EMAIL_ADMIN'),
        pass: this.config.get<string>('APP_PASSWORD'),
      },
    })

    const verifyUrl = `http://localhost:3000/verify?token=${token}`
    await transporter.sendMail({
      from: 'The Pizza Company',
      to: email,
      subject: 'Xác thực tài khoản',
      html: `<p>Bấm vào link để xác thực tài khoản:</p>
             <a href="${verifyUrl}">${verifyUrl}</a>`,
    })
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token)
      const user = await this.userRepo.findOne({
        where: { email: payload.email },
      })
      if (!user) throw new Error('Token hết hạn hoặc không hợp lệ!')

      user.isActive = 1
      await this.userRepo.save(user)

      return { message: 'Email được xác thực thành công!' }
    } catch (e) {
      throw new BadRequestException('Token hết hạn hoặc không hợp lệ!')
    }
  }

  async sendEmailAfterOrder(
    orderRequest: OrderRequest,
    email: string,
  ): Promise<any> {
    // 1. Khởi tạo transporter (ví dụ với Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get<string>('EMAIL_ADMIN'),
        pass: this.config.get<string>('APP_PASSWORD'),
      },
    })

    // 2. Render danh sách món ăn
    const orderItemsText = orderRequest.orderItems
      .map((item, index) => {
        let detail = `${index + 1}. ${item.foodName} - SL: ${item.quantity}`
        if (item.sizeName) detail += ` - Size: ${item.sizeName}`
        if (item.crustName) detail += ` - Đế: ${item.crustName}`
        if (item.comboName) detail += ` (thuộc ${item.comboName})`
        if (item.note) detail += ` - Ghi chú: ${item.note}`
        return detail
      })
      .join('\n')

    // 3. Nội dung mail
    const mailOptions = {
      from: 'The Pizza Company',
      to: email,
      subject: `Xác nhận đơn hàng tại ${orderRequest.restaurant_address_name}`,
      text: `
      Xin chào ${orderRequest.customer_name},

      Cảm ơn bạn đã đặt hàng tại ${orderRequest.restaurant_address_name}.
      Thông tin đơn hàng của bạn:

      - Hình thức đặt: ${orderRequest.order_method}
      - Thanh toán: ${orderRequest.payment_method} (${orderRequest.payment_status})
      - Tổng tiền: ${orderRequest.total_price.toLocaleString('vi-VN')} VND
      - Ngày đặt: ${new Date(orderRequest.order_date).toLocaleString('vi-VN')}
      - Nhận hàng lúc: ${new Date(orderRequest.receive_time).toLocaleString('vi-VN')}

      Danh sách món:
      ${orderItemsText}

      Chúng tôi sẽ liên hệ với bạn qua số điện thoại ${orderRequest.customer_phoneNumber} nếu cần.

      Trân trọng,
      The Pizza Company
          `,
    }

    // 4. Gửi mail
    try {
      const info = await transporter.sendMail(mailOptions)
      return { success: true, messageId: info.messageId }
    } catch (err) {
      console.error(err)
      return { success: false, error: err }
    }
  }

  //quên mật khẩu
  private generateOtp(length = 6): string {
    let otp = ''
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10).toString()
    }
    return otp
  }
  async sendOtpForgotPassword(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } })
    if (!user) {
      throw new BadRequestException('Email không tồn tại trong hệ thống!')
    }

    // Sinh OTP
    const otp = this.generateOtp()

    // Lưu OTP và thời gian hết hạn (ví dụ 5 phút) vào DB
    user.resetPasswordOtp = otp
    user.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000) // 5 phút
    await this.userRepo.save(user)

    // Tạo transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.config.get<string>('EMAIL_ADMIN'),
        pass: this.config.get<string>('APP_PASSWORD'),
      },
    })

    // Nội dung email
    const mailOptions = {
      from: 'The Pizza Company',
      to: email,
      subject: 'OTP khôi phục mật khẩu',
      html: `
        <p>Xin chào ${user.fullname || ''},</p>
        <p>Bạn vừa yêu cầu đặt lại mật khẩu. Đây là mã OTP của bạn (có hiệu lực trong 5 phút):</p>
        <h2 style="color: #e63946;">${otp}</h2>
        <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
        <p>Trân trọng,<br/>The Pizza Company</p>
      `,
    }

    // Gửi email
    try {
      const info = await transporter.sendMail(mailOptions)
      return true
    } catch (err) {
      return false
    }
  }

  async verifyOtp(email: string, otp: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email } })
    if (!user) throw new BadRequestException('Email không tồn tại!')

    if (
      !user.resetPasswordOtp ||
      user.resetPasswordOtp !== otp ||
      !user.resetPasswordExpires ||
      user.resetPasswordExpires < new Date()
    ) {
      throw new BadRequestException('OTP không hợp lệ hoặc đã hết hạn!')
      return false
    }
    return true
  }
}
