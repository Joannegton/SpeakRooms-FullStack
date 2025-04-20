import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioController } from './controllers/usuario.controller'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { OrmConfig } from 'ormConfig'
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository'
import { UsuarioMapper } from './infra/mappers/Usuario.mapper'
import { UsuarioMapperApplication } from './application/mappers/Usuario.mapper'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthController } from './controllers/auth.controller'
import { UseCases } from './application/useCases'
import { Queries } from './application/queries'
import { HashServiceImpl } from './infra/services/Hash.service'
import { AuthServiceImpl } from './infra/services/Auth.service'
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core'
import { JwtAuthGuard } from 'src/middlewares/jwt-auth.guard'
import { HttpInterceptor } from 'src/utils/http.interceptor'
import { RateLimitMiddleware } from 'src/middlewares/rate-limit.middleware'
import { HelmetMiddleware } from 'src/middlewares/helmet.middleware'
import { CorsMiddleware } from 'src/middlewares/cors.middleware'
import { RecuperarSenhaMapper } from './infra/mappers/RecuperarSenha.mapper'
import { RecuperarSenhaRepositoryImpl } from './infra/repositories/RecuperarSenha.repository'
import { RecuperarSenhaMapperApplication } from './application/mappers/RecuperarSenha.mapper'

@Module({
    imports: [
        TypeOrmModule.forRoot({ ...OrmConfig }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '60s' },
        }),
    ],
    controllers: [UsuarioController, AuthController],
    providers: [
        ...UseCases,
        ...Queries,
        UsuarioMapper,
        UsuarioMapperApplication,
        RecuperarSenhaMapper,
        RecuperarSenhaMapperApplication,
        JwtService,
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
        {
            provide: 'RecuperarSenhaRepository',
            useClass: RecuperarSenhaRepositoryImpl,
        },
        {
            provide: 'AuthService',
            useClass: AuthServiceImpl,
        },
        {
            provide: 'HashService',
            useClass: HashServiceImpl,
        },
        {
            provide: APP_GUARD,
            useFactory(
                jwtService: JwtService,
                reflector: Reflector,
                hashService: HashServiceImpl,
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
    exports: [
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
    ],
})
export class CoreModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RateLimitMiddleware).forRoutes('*')
        consumer.apply(HelmetMiddleware).forRoutes('*')
        consumer.apply(CorsMiddleware).forRoutes('*')
    }
}
