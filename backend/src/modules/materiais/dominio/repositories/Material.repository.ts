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
    deletarMaterial(
        material_id: number,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, void>
    buscarMaterialPorId(
        material_id: number,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material>
    buscarMateriaisPorUsuario(
        usuario_id: number,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]>
    buscarMateriaisPorTipo(
        tipo: string,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]>
    buscarMateriaisPorNivel(
        nivel: string,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]>
}
