import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'http-service-result'
import { ResultadoAssincrono } from 'http-service-result'
import { SessaoAprendizagem } from '../models/SessaoAprendizagem.model'

export type SessaoAprendizagemRepositoryExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao

export interface SessaoAprendizagemRepository {
    save(
        sessao: SessaoAprendizagem,
    ): ResultadoAssincrono<SessaoAprendizagemRepositoryExceptions, void>

    findById(
        idSessao: number,
    ): ResultadoAssincrono<
        SessaoAprendizagemRepositoryExceptions,
        SessaoAprendizagem
    >

    findAll(): ResultadoAssincrono<
        SessaoAprendizagemRepositoryExceptions,
        SessaoAprendizagem[]
    >

    update(
        idSessao: number,
        sessao: SessaoAprendizagem,
    ): ResultadoAssincrono<
        SessaoAprendizagemRepositoryExceptions,
        SessaoAprendizagem
    >

    delete(
        idSessao: number,
        idUsuario: number,
    ): ResultadoAssincrono<SessaoAprendizagemRepositoryExceptions, void>
}
