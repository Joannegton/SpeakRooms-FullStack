import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
    ServicoExcecao,
} from 'http-service-result'
import { ResultadoAssincrono } from 'http-service-result'
import { File } from '../models/File.model'
import { UploadApiResponse } from 'cloudinary'
import { AxiosResponse } from 'axios'

export type FileRepositoryExceptions =
    | PropriedadesInvalidasExcecao
    | ServicoExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export type DownloadFileResult = {
    metadata: File
    arquivo: AxiosResponse
}

export interface FileRepository {
    uploadMetadataFile(
        file: File,
    ): ResultadoAssincrono<FileRepositoryExceptions, void>
    uploadNoCloudinary(
        file: Express.Multer.File,
    ): ResultadoAssincrono<FileRepositoryExceptions, UploadApiResponse>
    downloadFile(
        material_id: number,
    ): ResultadoAssincrono<FileRepositoryExceptions, DownloadFileResult>
    deleteFile(
        material_id: number,
    ): ResultadoAssincrono<FileRepositoryExceptions, void>
}
