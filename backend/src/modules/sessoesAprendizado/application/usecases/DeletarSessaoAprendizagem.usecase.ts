import { Inject } from '@nestjs/common'
import { SessaoAprendizagemRepository } from '../../domain/repositories/SessaoAprendizagem.repository'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'

type DeletarSessaoAprendizagemExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioSemDadosExcecao
    | RepositorioExcecao

export class DeletarSessaoAprendizagemUseCase {
    constructor(
        @Inject('SessaoAprendizagemRepository')
        private readonly sessaoAprendizagemRepository: SessaoAprendizagemRepository,
    ) {}

    async execute(
        idSessao: number,
        idUsuario: number,
    ): ResultadoAssincrono<DeletarSessaoAprendizagemExceptions, void> {
        if (!idSessao || !idUsuario) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'ID da sessão ou ID do usuário inválido',
                ),
            )
        }

        const resultado = await this.sessaoAprendizagemRepository.delete(
            idSessao,
            idUsuario,
        )
        if (resultado.ehFalha()) return ResultadoUtil.falha(resultado.erro)

        return ResultadoUtil.sucesso(resultado.valor)
    }
}
