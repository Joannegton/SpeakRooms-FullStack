import { Inject } from '@nestjs/common'
import { UsuarioRepository } from '../../domain/repositories/Usuario.repository'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'

type DeletarUsuarioUseCaseExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao

export class DeletarUsuarioUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
    ) {}

    async execute(
        nomeUsuario: string, //verificar onde ficam as logicas de retorno de erros
    ): ResultadoAssincrono<DeletarUsuarioUseCaseExceptions, void> {
        const usuarioExistente =
            await this.usuarioRepository.findByUsuarioOrEmail(nomeUsuario)
        if (usuarioExistente.ehFalha()) {
            return ResultadoUtil.falha(usuarioExistente.erro)
        }

        if (!usuarioExistente.valor) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Usuario não encontrado'),
            )
        }

        await this.usuarioRepository.delete(nomeUsuario)

        return ResultadoUtil.sucesso()
    }
}
