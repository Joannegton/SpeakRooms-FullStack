import { UsuarioModule } from './modules/usuario/usuario.module'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RateLimitMiddleware } from './modules/usuario/middlewares/rate-limit.middleware'
import { HelmetMiddleware } from './modules/usuario/middlewares/helmet.middleware'
import { CorsMiddleware } from './modules/usuario/middlewares/cors.middleware'
import { APP_GUARD, Reflector } from '@nestjs/core'
import { JwtAuthGuard } from './modules/usuario/middlewares/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { HashService } from './shared/services/Hash.service'

@Module({
    imports: [UsuarioModule],
    controllers: [AppController],
    providers: [
        JwtService,
        AppService,
        {
            provide: 'HashService',
            useClass: HashService,
        },
        {
            provide: APP_GUARD,
            useFactory(
                jwtService: JwtService,
                reflector: Reflector,
                hashService: HashService,
            ) {
                return new JwtAuthGuard(jwtService, reflector, hashService)
            },
            inject: [JwtService, Reflector, 'HashService'],
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RateLimitMiddleware).forRoutes('*')
        consumer.apply(HelmetMiddleware).forRoutes('*')
        consumer.apply(CorsMiddleware).forRoutes('*')
    }
}
