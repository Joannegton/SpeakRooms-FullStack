import { SessaoAprendizagemMapperApplication } from './application/mappers/SessaoAprendizagem.mapper'
import { AgendarSessaoUseCase } from './application/usecases/AgendarSessao.usecase'
import { SessaoAprendizagemMapper } from './infra/mappers/SessaoAprendizagem.mapper'
import { SessaoAprendizagemRepositoryImpl } from './infra/repositories/SessaoAprendizagem.repository'
import { OAuthService } from './infra/services/OAuth.service'
import { SessaoAprendizadoController } from './SessaoAprendizado.controller'
import { Module } from '@nestjs/common'
import { OAuthController } from './infra/controllers/OAuth.controller'
import { BuscarSessaoAprendizagemIdQuery } from './application/queries/BuscarSessaoAprendizagemId.query'

@Module({
    imports: [],
    controllers: [SessaoAprendizadoController, OAuthController],
    providers: [
        AgendarSessaoUseCase,
        BuscarSessaoAprendizagemIdQuery,
        SessaoAprendizagemMapper,
        SessaoAprendizagemMapperApplication,
        {
            provide: 'SessaoAprendizagemRepository',
            useClass: SessaoAprendizagemRepositoryImpl,
        },
        OAuthService,
    ],
})
export class SessaoAprendizadoModule {}
