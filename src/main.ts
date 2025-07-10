import { config } from 'dotenv'
config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from '~/app.module'
import { ValidationPipe } from './validation.pipe'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 8080)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
