import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

const PORT = Number(process.env.PORT)

async function start() {
  const app = await NestFactory.create(AppModule)

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Транспорт')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(PORT, async () =>
    console.log(`Application is running on: http://localhost:${PORT}`),
  )
}

start()
