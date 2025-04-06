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

export class BuscarUsuariosQuery {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        private readonly usuarioMapper: UsuarioMapperApplication,
    ) {}

    async execute(): ResultadoAssincrono<
        BuscarUsuariosQueryExceptions,
        UsuarioDto[]
    > {
        const response = await this.usuarioRepository.findAll()
        if (response.ehFalha()) return ResultadoUtil.falha(response.erro)

        const usuarios = response.valor.map((usuario) => {
            return this.usuarioMapper.toDto(usuario)
        })
        return ResultadoUtil.sucesso(usuarios)
    }
}
