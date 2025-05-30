import { Injectable } from '@nestjs/common'
import { File } from '../../dominio/models/File.model'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { CloudinaryService } from '../services/Cloudinary.service'
import {
    DownloadFileResult,
    FileRepository,
    FileRepositoryExceptions,
} from '../../dominio/repositories/File.repository'
import {
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
    ServicoExcecao,
} from 'http-service-result'
import { FileMapper } from '../mappers/File.mapper'
import { UploadApiResponse } from 'cloudinary'
import { FileModel } from '../models/Files.model'
import axios from 'axios'

@Injectable()
export class FileRepositoryImpl implements FileRepository {
    constructor(
        private readonly cloudinaryService: CloudinaryService,
        private readonly fileMapper: FileMapper,
    ) {}

    async uploadMetadataFile(
        file: File,
    ): ResultadoAssincrono<FileRepositoryExceptions, void> {
        try {
            const model = this.fileMapper.domainToModel(file)

            await model.save()

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao salvar metadados no banco de dados:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao(
                    'Erro ao salvar metadados no banco de dados',
                ),
            )
        }
    }

    async uploadNoCloudinary(
        file: Express.Multer.File,
    ): ResultadoAssincrono<FileRepositoryExceptions, UploadApiResponse> {
        const uploadResult =
            await this.cloudinaryService.uploadNoCloudinary(file)

        if (uploadResult.ehFalha()) {
            return ResultadoUtil.falha(uploadResult.erro)
        }

        return ResultadoUtil.sucesso(uploadResult.valor)
    }

    async downloadFile(
        material_id: number,
    ): ResultadoAssincrono<FileRepositoryExceptions, DownloadFileResult> {
        try {
            const model = await FileModel.findOne({
                where: { material_id },
            })
            if (!model) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Arquivo não encontrado'),
                )
            }

            const arquivoDownload = await axios.get(model.url, {
                responseType: 'stream',
            })
            if (arquivoDownload.status !== 200) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Erro ao baixar o arquivo'),
                )
            }

            const file = this.fileMapper.modelToDomain(model)
            if (file.ehFalha()) {
                return ResultadoUtil.falha(file.erro)
            }

            return ResultadoUtil.sucesso({
                metadata: file.valor,
                arquivo: arquivoDownload,
            })
        } catch (error) {
            console.error('Erro ao buscar o arquivo:', error)
            return ResultadoUtil.falha(
                new RepositorioExcecao(
                    'Erro ao buscar o arquivo no repositório',
                ),
            )
        }
    }

    async deleteFile(
        material_id: number,
    ): ResultadoAssincrono<FileRepositoryExceptions, void> {
        const model = await FileModel.findOne({ where: { material_id } })
        if (!model) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Arquivo não encontrado'),
            )
        }

        const deleteCloudinaryResult =
            await this.cloudinaryService.deleteFileFromCloudinary(
                model.cloudinary_id,
            )

        if (deleteCloudinaryResult.ehFalha())
            return ResultadoUtil.falha(deleteCloudinaryResult.erro)

        const deleteMetadataResult = await FileModel.delete({
            material_id: model.material_id,
        })

        if (!deleteMetadataResult.affected)
            return ResultadoUtil.falha(
                new RepositorioExcecao('Erro ao deletar'),
            )

        return ResultadoUtil.sucesso()
    }
}
