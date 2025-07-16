import { IsEmail, IsString, Matches, MinLength } from 'class-validator'

export class RegisterDTO {
  @IsString()
  @Matches(/^[a-zA-Z\s]+$/, {
    message: 'Họ tên chỉ chứa chữ cái và khoảng trắng',
  })
  @MinLength(2, {
    message: 'Họ tên ít nhất 2 ký tự',
  })
  fullname: string

  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Số điện thoại phải là 10 ký tự',
  })
  phoneNumber: string

  @IsEmail(
    {},
    {
      message: 'Email không hợp lệ',
    },
  )
  email: string

  @IsString()
  @MinLength(6, {
    message: 'Mật khẩu ít nhất 6 ký tự',
  })
  password: string
}
