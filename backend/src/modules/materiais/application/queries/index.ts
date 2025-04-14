import { BuscarMateriaisCategoriaQuery } from './BuscarMateriaisCategoria.useCase'
import { BuscarMateriaisNivelQuery } from './BuscarMateriaisNivel.useCase'
import { BuscarMateriaisUsuarioQuery } from './BuscarMateriaisUsuario.useCase'
import { buscarMaterialPorIdQuery } from './BuscarMaterialID.useCase'
import { DownloadFileQuery } from './downloadFile.query'

export const Queries = [
    BuscarMateriaisCategoriaQuery,
    BuscarMateriaisNivelQuery,
    BuscarMateriaisUsuarioQuery,
    buscarMaterialPorIdQuery,
    DownloadFileQuery,
]
