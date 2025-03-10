import { ResultAsync } from 'src/utils/result'
import { Usuario } from '../../domain/models/usuario.model'
import {
    UsuarioRepository,
    UsuarioRepositoryExceptions,
} from '../../domain/repositories/usuario.repository'

export class UsuarioRepositoryImpl implements UsuarioRepository {
    save(usuario: Usuario): ResultAsync<UsuarioRepositoryExceptions, void> {
        throw new Error('Method not implemented.')
    }
    findByEmail(email: string): ResultAsync<UsuarioRepositoryExceptions, Usuario> {
        throw new Error('Method not implemented.')
    }
    findById(id: string): ResultAsync<UsuarioRepositoryExceptions, Usuario> {
        throw new Error('Method not implemented.')
    }
    delete(id: string): ResultAsync<UsuarioRepositoryExceptions, void> {
        throw new Error('Method not implemented.')
    }
    update(usuario: Usuario): ResultAsync<UsuarioRepositoryExceptions, void> {
        throw new Error('Method not implemented.')
    }
    findAll(): ResultAsync<UsuarioRepositoryExceptions, Usuario[]> {
        throw new Error('Method not implemented.')
    }

}