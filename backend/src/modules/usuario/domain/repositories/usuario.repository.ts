import { ResultAsync } from 'src/utils/result'
import { Usuario } from '../models/usuario.model'
import { InvalidPropsException, RepositoryException } from 'src/utils/exception'

export type UsuarioRepositoryExceptions =
    | RepositoryException
    | InvalidPropsException

export interface UsuarioRepository {
    save(props: Usuario): ResultAsync<UsuarioRepositoryExceptions, void>
    findByEmail(
        email: string,
    ): ResultAsync<UsuarioRepositoryExceptions, Usuario>
    findById(id: string): ResultAsync<UsuarioRepositoryExceptions, Usuario>
    delete(id: string): ResultAsync<UsuarioRepositoryExceptions, void>
    update(usuario: Usuario): ResultAsync<UsuarioRepositoryExceptions, void>
    findAll(): ResultAsync<UsuarioRepositoryExceptions, Usuario[]>
}
