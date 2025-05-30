import { Inject } from '@nestjs/common'
import { SessaoAprendizagemRepository } from '../../domain/repositories/SessaoAprendizagem.repository'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import {
    PropriedadesInvalidasExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'
import { SessaoAprendizagemMapperApplication } from '../mappers/SessaoAprendizagem.mapper'
import { SessaoAprendizagemDto } from '../dtos/sessaoAprendizagem.dto'

type BuscarSessaoAprendizagemIdQueryExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioSemDadosExcecao

export class BuscarSessaoAprendizagemIdQuery {
    constructor(
        @Inject('SessaoAprendizagemRepository')
        private readonly sessaoAprendizagemRepository: SessaoAprendizagemRepository,
    ) {}

    async execute(
        idSessao: number,
    ): ResultadoAssincrono<
        BuscarSessaoAprendizagemIdQueryExceptions,
        SessaoAprendizagemDto
    > {
        if (!idSessao)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('ID inválido'),
            )

        const result =
            await this.sessaoAprendizagemRepository.findById(idSessao)
        if (result.ehFalha()) return ResultadoUtil.falha(result.erro)

        const sessaoDto = SessaoAprendizagemMapperApplication.toDto(
            result.valor,
        )

        return ResultadoUtil.sucesso(sessaoDto)
    }
}
