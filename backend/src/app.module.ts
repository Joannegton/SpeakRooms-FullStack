import { UsuarioModule } from './modules/usuario/usuario.module'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { RateLimitMiddleware } from './middlewares/rate-limit.middleware'
import { HelmetMiddleware } from './middlewares/helmet.middleware'
import { CorsMiddleware } from './middlewares/cors.middleware'
import { APP_GUARD, Reflector, APP_INTERCEPTOR } from '@nestjs/core'
import { JwtAuthGuard } from './middlewares/jwt-auth.guard'
import { JwtService } from '@nestjs/jwt'
import { HashService } from './shared/services/Hash.service'
import { HttpInterceptor } from './utils/http.interceptor'

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
        {
            provide: APP_INTERCEPTOR,
            useClass: HttpInterceptor,
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
