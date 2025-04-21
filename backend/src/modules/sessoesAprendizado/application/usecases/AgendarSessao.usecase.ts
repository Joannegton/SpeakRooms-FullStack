import { Inject } from '@nestjs/common'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import {
    AgendarSessaoDto,
    SessaoAprendizagemDto,
} from '../dtos/sessaoAprendizagem.dto'
import { SessaoAprendizagemMapperApplication } from '../mappers/SessaoAprendizagem.mapper'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { SessaoAprendizagemRepository } from '../../domain/repositories/SessaoAprendizagem.repository'

type AgendarSessaoUseCaseExceptions = PropriedadesInvalidasExcecao

export class AgendarSessaoUseCase {
    constructor(
        @Inject('SessaoAprendizagemRepository')
        private readonly sessaoRepository: SessaoAprendizagemRepository,
        private readonly sessaoAprendizagemMapper: SessaoAprendizagemMapperApplication,
    ) {}

    async execute(
        props: AgendarSessaoDto,
    ): ResultadoAssincrono<
        AgendarSessaoUseCaseExceptions,
        SessaoAprendizagemDto
    > {
        const sessaoDomain = this.sessaoAprendizagemMapper.toDomain(props)
        if (sessaoDomain.ehFalha()) {
            return ResultadoUtil.falha(sessaoDomain.erro)
        }

        const sessao = await this.sessaoRepository.save(sessaoDomain.valor)
        if (sessao.ehFalha()) {
            return ResultadoUtil.falha(sessao.erro)
        }

        const sessaoDto = this.sessaoAprendizagemMapper.toDto(sessao.valor)
        return ResultadoUtil.sucesso(sessaoDto)
    }
}
