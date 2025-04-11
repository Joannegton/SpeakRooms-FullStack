import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'src/utils/exception'
import { ResultadoAssincrono } from 'src/utils/result'
import { Material } from '../models/Materiais.model'

export type MaterialRepositoryExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export interface MaterialRepository {
    salvar(
        material: Material,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material>
}
