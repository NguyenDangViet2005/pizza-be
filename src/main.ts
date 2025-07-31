import { config } from 'dotenv'
config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from '~/app.module'
import { ValidationPipe } from '@nestjs/common'
import { DOMAIN_FRONTEND } from '~/utils/constants'
import cookieParser from 'cookie-parser'
import { ConfigService } from '@nestjs/config'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  app.use(cookieParser())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Bỏ field không khai báo trong DTO
      forbidNonWhitelisted: true, // Trả lỗi nếu có field thừa
      transform: true, // Tự chuyển đổi kiểu dữ liệu
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: false, // Cho phép trả message lỗi
    }),
  )
  // Mở CORS cho localhost:3000
  app.enableCors({
    origin: DOMAIN_FRONTEND,
    credentials: true, // Nếu bạn dùng cookie hoặc xác thực
  })
  await app.listen(config.get<number>('PORT') ?? 8080)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
