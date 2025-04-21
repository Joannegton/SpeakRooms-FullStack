import { SessaoAprendizagemMapperApplication } from './application/mappers/SessaoAprendizagem.mapper'
import { AgendarSessaoUseCase } from './application/usecases/AgendarSessao.usecase'
import { SessaoAprendizagemMapper } from './infra/mappers/SessaoAprendizagem.mapper'
import { SessaoAprendizagemRepositoryImpl } from './infra/repositories/SessaoAprendizagem.repository'
import { SessaoAprendizadoController } from './SessaoAprendizado.controller'
import { Module } from '@nestjs/common'

@Module({
    imports: [],
    controllers: [SessaoAprendizadoController],
    providers: [
        SessaoAprendizagemMapper,
        SessaoAprendizagemMapperApplication,
        AgendarSessaoUseCase,
        {
            provide: 'SessaoAprendizagemRepository',
            useClass: SessaoAprendizagemRepositoryImpl,
        },
    ],
})
export class SessaoAprendizadoModule {}
