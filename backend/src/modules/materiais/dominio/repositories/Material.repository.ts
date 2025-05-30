import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'
import { ResultadoAssincrono } from 'http-service-result'
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
    buscarMateriaisPorCategoria(
        categoria: string[],
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]>
    buscarMateriaisPorNivel(
        nivel: string[],
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]>
}
