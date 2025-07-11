import { config } from 'dotenv'
config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from '~/app.module'
import { ValidationPipe } from './validation.pipe'
import { DOMAIN_FRONTEND } from '~/utils/constants'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  // Mở CORS cho localhost:3000
  app.enableCors({
    origin: DOMAIN_FRONTEND,
    credentials: true, // Nếu bạn dùng cookie hoặc xác thực
  })
  await app.listen(process.env.PORT ?? 8080)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
