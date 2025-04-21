import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'src/utils/exception'
import { RecuperarSenha } from '../models/RecuperarSenha.model'
import { ResultadoAssincrono } from 'src/utils/result'

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
