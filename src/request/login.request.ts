import { IsEmail, IsString, MinLength } from 'class-validator'

export class LoginRequest {
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
