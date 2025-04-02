import { ResultadoAssincrono } from 'src/utils/result'
import { Usuario } from '../models/usuario.model'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'

export type UsuarioRepositoryExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export interface UsuarioRepository {
    save(props: Usuario): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    findByUsuarioOrEmail(
        email: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario>
    findById(
        id: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario>
    delete(id: string): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    update(
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    findAll(): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario[]>
}
