import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'
import { RecuperarSenha } from '../models/RecuperarSenha.model'
import { ResultadoAssincrono } from 'http-service-result'

export type RecuperarSenhaRepositoryExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao
    | RepositorioSemDadosExcecao

export interface RecuperarSenhaRepository {
    salvar(
        recuperarSenha: RecuperarSenha,
    ): ResultadoAssincrono<RecuperarSenhaRepositoryExceptions, string>
    buscarTokenPorIdUsuario(
        idUsuario: number,
    ): ResultadoAssincrono<RecuperarSenhaRepositoryExceptions, RecuperarSenha>
}
