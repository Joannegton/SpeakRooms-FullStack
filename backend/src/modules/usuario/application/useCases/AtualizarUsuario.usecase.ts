import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { UsuarioRepository } from '../../domain/repositories/usuario.repository'
import { Inject } from '@nestjs/common'
import { UsuarioMapperApplication } from '../mappers/Usuario.mapper'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { UsuarioDto } from '../dtos/Usuario.dto'

export type AtualizarUsuarioUseCaseExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class AtualizarUsuarioUseCase {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly usuarioMapper: UsuarioMapperApplication,
    ) {}

    async execute(
        usuario: UsuarioDto,
    ): ResultadoAssincrono<AtualizarUsuarioUseCaseExceptions, void> {
        const usuarioExistente =
            await this.usuarioRepository.findByUsuarioOrEmail(
                usuario.nomeUsuario,
            )
        if (usuarioExistente.ehFalha()) {
            return ResultadoUtil.falha(usuarioExistente.erro)
        }

        if (usuarioExistente.valor.nomeUsuario !== usuario.nomeUsuario) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Credenciais invalidas.'),
            )
        }

        const domain = this.usuarioMapper.toDomain(usuario)
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        await this.usuarioRepository.update(domain.valor)
        return ResultadoUtil.sucesso()
    }
}
