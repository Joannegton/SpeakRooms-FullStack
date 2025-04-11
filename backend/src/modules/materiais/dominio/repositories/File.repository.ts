import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
    ServicoExcecao,
} from 'src/utils/exception'
import { ResultadoAssincrono } from 'src/utils/result'
import { File } from '../models/File.model'
import { UploadApiResponse } from 'cloudinary'

export type FileRepositoryExceptions =
    | PropriedadesInvalidasExcecao
    | ServicoExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export interface FileRepository {
    uploadMetadataFile(
        file: File,
    ): ResultadoAssincrono<FileRepositoryExceptions, File>
    uploadNoCloudinary(
        file: Express.Multer.File,
    ): ResultadoAssincrono<FileRepositoryExceptions, UploadApiResponse>
}
