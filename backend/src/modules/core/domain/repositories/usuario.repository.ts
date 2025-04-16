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
        emailOrUsuario: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario>
    findAll(): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario[]>
    findById(
        id: number,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, Usuario>
    delete(
        nomeUsuario: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    update(
        id: number,
        usuario: Usuario,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
    salvarCodigoRecuperacaoSenha(
        id: number,
        codigoRecuperacao: string,
    ): ResultadoAssincrono<UsuarioRepositoryExceptions, void>
}
