import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

export class UserInfoRequest {
  @IsString()
  @MinLength(2, { message: 'Tên không được ít hơn 2 kí tự!' })
  fullname: string

  @IsEmail(
    {},
    {
      message: 'Email không hợp lệ',
    },
  )
  email: string

  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Số điện thoại phải là 10 ký tự',
  })
  phoneNumber: string

  @IsOptional()
  @IsString()
  avatar: string

  @IsOptional()
  @IsString()
  avatar_public_id?: string
}
