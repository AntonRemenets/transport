import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

const PORT = Number(process.env.PORT)

async function start() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, async () => console.log(`Application is running on: http://localhost:${PORT}`))
}

start()
