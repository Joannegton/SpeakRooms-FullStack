import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioController } from './usuario.controller'
import { Module } from '@nestjs/common'
import { OrmConfig } from 'ormConfig'
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository'
import { SalvarUsuarioUseCase } from './application/useCases/SalvarUsuario.usecase'
import { UsuarioMapper } from './infra/mappers/Usuario.mapper'

@Module({
    imports: [TypeOrmModule.forRoot({ ...OrmConfig })],
    controllers: [UsuarioController],
    providers: [
        {
            provide: 'UsuarioRepository',
            useClass: UsuarioRepositoryImpl,
        },
        SalvarUsuarioUseCase,
        UsuarioMapper,
    ],
})
export class UsuarioModule {}
