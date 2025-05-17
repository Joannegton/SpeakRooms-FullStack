import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { ResultadoAssincrono } from 'src/utils/result'
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
        id: number,
    ): ResultadoAssincrono<SessaoAprendizagemRepositoryExceptions, void>
}
