import { Inject } from '@nestjs/common'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { AgendarSessaoDto } from '../dtos/sessaoAprendizagem.dto'
import { SessaoAprendizagemMapperApplication } from '../mappers/SessaoAprendizagem.mapper'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { SessaoAprendizagemRepository } from '../../domain/repositories/SessaoAprendizagem.repository'
import { OAuthService } from '../../infra/services/OAuth.service'

type AgendarSessaoUseCaseExceptions = PropriedadesInvalidasExcecao

export class AgendarSessaoUseCase {
    constructor(
        @Inject('SessaoAprendizagemRepository')
        private readonly sessaoRepository: SessaoAprendizagemRepository,
        private readonly sessaoAprendizagemMapper: SessaoAprendizagemMapperApplication,
        private readonly OAuthService: OAuthService,
    ) {}

    async execute(
        props: AgendarSessaoDto,
    ): ResultadoAssincrono<AgendarSessaoUseCaseExceptions, void> {
        // TODO: Sempre cria no mesmo email, arrumar isso
        const usuarioZoom = await this.OAuthService.obterUsuarioZoom()
        if (usuarioZoom.ehFalha()) {
            return ResultadoUtil.falha(usuarioZoom.erro)
        }

        const reuniao = await this.OAuthService.gerarReuniaoZoom(
            usuarioZoom.valor,
            props.titulo,
            props.dataHoraInicio,
            60,
        )
        if (reuniao.ehFalha()) {
            return ResultadoUtil.falha(reuniao.erro)
        }

        const sessaoDomain = this.sessaoAprendizagemMapper.toDomain({
            ...props,
            linkVideo: reuniao.valor.join_url,
        })
        if (sessaoDomain.ehFalha()) {
            return ResultadoUtil.falha(sessaoDomain.erro)
        }

        const sessao = await this.sessaoRepository.save(sessaoDomain.valor)
        if (sessao.ehFalha()) {
            return ResultadoUtil.falha(sessao.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
