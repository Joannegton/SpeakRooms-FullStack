import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { UsuarioRepository } from '../../domain/repositories/usuario.repository'
import { UsuarioDto } from '../dtos/Usuario.dto'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { UsuarioMapperApplication } from '../mappers/Usuario.mapper'
import { Inject } from '@nestjs/common'

type BuscarUsuariosQueryExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class BuscarUsuarioQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly usuarioMapper: UsuarioMapperApplication,
    ) {}

    async execute(
        emailOrUsuario: string,
    ): ResultadoAssincrono<BuscarUsuariosQueryExceptions, UsuarioDto> {
        const response =
            await this.usuarioRepository.findByUsuarioOrEmail(emailOrUsuario)
        if (response.ehFalha()) return ResultadoUtil.falha(response.erro)

        const usuario = this.usuarioMapper.toDto(response.valor)

        return ResultadoUtil.sucesso(usuario)
    }
}
