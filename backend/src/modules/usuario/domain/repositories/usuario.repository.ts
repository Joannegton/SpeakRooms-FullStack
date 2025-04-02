import { ResultadoAssincrono } from 'src/utils/result'
import { Usuario } from '../models/usuario.model'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'src/utils/exception'

export type UsuarioRepositoryExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao
    | RepositorioSemDadosExcecao

export interface UsuarioRepository {
    save(props: Usuario): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    findByUsuarioOrEmail(
        email: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario>
    findById(
        id: number,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario>
    delete(id: string): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    update(
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    findAll(): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario[]>
}
