import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { UsuarioRepository } from '../../domain/repositories/usuario.repository'
import { Inject } from '@nestjs/common'
import { UsuarioMapperApplication } from '../mappers/Usuario.mapper'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { AtualizarUsuarioDto } from '../dtos/Usuario.dto'

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
        id: number,
        usuario: AtualizarUsuarioDto,
    ): ResultadoAssincrono<AtualizarUsuarioUseCaseExceptions, void> {
        const domain = this.usuarioMapper.toDomainUpdate(id, usuario)
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        await this.usuarioRepository.update(id, domain.valor)
        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        return ResultadoUtil.sucesso()
    }
}
