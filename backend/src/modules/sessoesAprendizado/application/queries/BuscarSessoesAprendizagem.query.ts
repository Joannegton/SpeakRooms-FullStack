import {
    PropriedadesInvalidasExcecao,
    RepositorioSemDadosExcecao,
    ResultadoAssincrono,
    ResultadoUtil,
} from 'http-service-result'
import { SessaoAprendizagemRepository } from '../../domain/repositories/SessaoAprendizagem.repository'
import { Inject } from '@nestjs/common'
import { SessaoAprendizagemDto } from '../dtos/sessaoAprendizagem.dto'
import { SessaoAprendizagemMapperApplication } from '../mappers/SessaoAprendizagem.mapper'

type BuscarSessaoAprendizagemIdQueryExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioSemDadosExcecao
export class BuscarSessoesAprendizagemQuery {
    constructor(
        @Inject('SessaoAprendizagemRepository')
        private readonly sessaoAprendizagemRepository: SessaoAprendizagemRepository,
    ) {}

    async execute(): ResultadoAssincrono<
        BuscarSessaoAprendizagemIdQueryExceptions,
        SessaoAprendizagemDto[]
    > {
        const sessoes = await this.sessaoAprendizagemRepository.findAll()
        if (sessoes.ehFalha()) return ResultadoUtil.falha(sessoes.erro)

        const sessoesDto = SessaoAprendizagemMapperApplication.toDtoList(
            sessoes.valor,
        )

        return ResultadoUtil.sucesso(sessoesDto)
    }
}
