import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioController } from './controllers/usuario.controller'
import { Module } from '@nestjs/common'
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository'
import { UsuarioMapperApplication } from './application/mappers/Usuario.mapper'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AuthController } from './controllers/auth.controller'
import { UseCases } from './application/useCases'
import { Queries } from './application/queries'
import { HashServiceImpl } from './infra/services/Hash.service'
import { AuthRepositoryImpl } from './infra/repositories/Auth.repository'
import { APP_GUARD, APP_INTERCEPTOR, Reflector } from '@nestjs/core'
import { JwtAuthGuard } from 'src/middlewares/jwt-auth.guard'
import { HttpInterceptor } from 'src/utils/http.interceptor'
import { RecuperarSenhaRepositoryImpl } from './infra/repositories/RecuperarSenha.repository'
import { RecuperarSenhaMapperApplication } from './application/mappers/RecuperarSenha.mapper'
import { EmailService } from '../shared/services/EmailService'
import { RefreshTokenRepositoryImpl } from './infra/repositories/RefreshToken.repository.impl'
import { mappers } from './infra/mappers'
import { TentativaLoginRepositoryImpl } from './infra/repositories/TentativaLogin.repository.impl'
import { OrmConfig } from 'ormConfig'

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
        ...mappers,
        UsuarioMapperApplication,
        RecuperarSenhaMapperApplication,
        JwtService,
        EmailService,
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
        {
            provide: 'RecuperarSenhaRepository',
            useClass: RecuperarSenhaRepositoryImpl,
        },
        {
            provide: 'RefreshTokenRepository',
            useClass: RefreshTokenRepositoryImpl,
        },
        {
            provide: 'AuthRepository',
            useClass: AuthRepositoryImpl,
        },
        {
            provide: 'HashService',
            useClass: HashServiceImpl,
        },
        {
            provide: 'TentativaLoginRepository',
            useClass: TentativaLoginRepositoryImpl,
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
export class CoreModule {}
