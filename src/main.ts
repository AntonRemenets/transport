import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const PORT = process.env.PORT

async function start() {
  const app = await NestFactory.create(AppModule)
  await app.listen(PORT, () => console.log(`Server is ready on http://localhost:${PORT}`))
}
start()
