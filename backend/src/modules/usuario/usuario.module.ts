import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioController } from './usuario.controller'
import { Module } from '@nestjs/common'
import { OrmConfig } from 'ormConfig'
import { UsuarioRepositoryImpl } from './infra/repositories/Usuario.repository'
import { SalvarUsuarioUseCase } from './application/useCases/SalvarUsuario.usecase'
import { UsuarioMapper } from './infra/mappers/Usuario.mapper'
import { UsuarioMapperApplication } from './application/mappers/Usuario.mapper'
import { HashService } from 'src/shared/services/Hash.service'

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
        UsuarioMapperApplication,
        HashService,
    ],
})
export class UsuarioModule {}
