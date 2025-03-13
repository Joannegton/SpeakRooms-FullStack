import { ResultAsync } from 'src/utils/result'
import { Usuario } from '../../domain/models/usuario.model'
import {
    UsuarioRepository,
    UsuarioRepositoryExceptions,
} from '../../domain/repositories/usuario.repository'
import { UsuarioMapper } from '../mappers/Usuario.mapper'
import { R } from 'src/utils/resultAsync'
import { RepositoryException } from 'src/utils/exception'

export class UsuarioRepositoryImpl implements UsuarioRepository {
    constructor(private readonly usuarioMapper: UsuarioMapper) {}

    async save(
        usuario: Usuario,
    ): ResultAsync<UsuarioRepositoryExceptions, void> {
        try {
            const model = this.usuarioMapper.domainToModel(usuario)
            await model.save()
            return R.ok()
        } catch (error) {
            return R.failure(new RepositoryException(error))
        }
    }

    findByEmail(
        email: string,
    ): ResultAsync<UsuarioRepositoryExceptions, Usuario> {
        throw new Error(`Method not implemented. ${email}`)
    }
    findById(id: string): ResultAsync<UsuarioRepositoryExceptions, Usuario> {
        throw new Error(`Method not implemented.${id}`)
    }
    delete(id: string): ResultAsync<UsuarioRepositoryExceptions, void> {
        throw new Error(`Method not implemented.${id}`)
    }
    update(usuario: Usuario): ResultAsync<UsuarioRepositoryExceptions, void> {
        throw new Error(`Method not implemented.${usuario}`)
    }
    findAll(): ResultAsync<UsuarioRepositoryExceptions, Usuario[]> {
        throw new Error(`Method not implemented.`)
    }
}
