import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as dotenv from 'dotenv'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

dotenv.config()

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(cookieParser())
    const config = new DocumentBuilder()
        .setTitle('Doocumentação da API')
        .setDescription('API para gerenciamento do Sistema SpeakRoom')
        .setVersion('1.0')
        .addCookieAuth('accessToken')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    )

    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
