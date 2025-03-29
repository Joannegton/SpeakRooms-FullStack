import { ResultadoUtil, ResultadoAssincrono } from 'src/utils/result'
import { Usuario } from '../../domain/models/usuario.model'
import {
    UsuarioRepository,
    UsuarioRepositoryExceptions,
} from '../../domain/repositories/usuario.repository'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { RepositorioExcecao } from 'src/utils/exception'

export class UsuarioRepositoryImpl implements UsuarioRepository {
    constructor(private readonly usuarioMapper: UsuarioMapper) {}

    async save(
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        try {
            const model = this.usuarioMapper.domainToModel(usuario)
            await model.save()
            return ResultadoUtil.sucesso()
        } catch (error) {
            return ResultadoUtil.falha(new RepositorioExcecao(error))
        }
    }

    findByEmail(
        email: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario> {
        throw new Error(`Method not implemented. ${email}`)
    }
    findById(
        id: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario> {
        throw new Error(`Method not implemented.${id}`)
    }
    delete(id: string): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        throw new Error(`Method not implemented.${id}`)
    }
    update(
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void> {
        throw new Error(`Method not implemented.${usuario}`)
    }
    findAll(): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario[]> {
        throw new Error(`Method not implemented.`)
    }
}
