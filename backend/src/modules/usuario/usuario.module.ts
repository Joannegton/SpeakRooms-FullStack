import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioController } from './usuario.controller'
import { Module } from '@nestjs/common'
import { OrmConfig } from 'ormConfig'
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository'
import { UsuarioMapper } from './infra/mappers/Usuario.mapper'
import { UsuarioMapperApplication } from './application/mappers/Usuario.mapper'
import { HashService } from 'src/shared/services/Hash.service'
import { JwtModule } from '@nestjs/jwt'
import { AuthServiceImpl } from './domain/services/Auth.service'
import { AuthController } from './auth.controller'
import { UseCases } from './application/useCases'
import { Queries } from './application/queries'

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
        HashService,
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
        {
            provide: 'AuthService',
            useClass: AuthServiceImpl,
        },
    ],
    exports: [
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
    ],
})
export class UsuarioModule {}
