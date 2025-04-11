import { Injectable } from '@nestjs/common'
import { File } from '../../dominio/models/File.model'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { CloudinaryService } from '../services/Cloudinary.service'
import {
    FileRepository,
    FileRepositoryExceptions,
} from '../../dominio/repositories/File.repository'
import { ServicoExcecao } from 'src/utils/exception'
import { FileMapper } from '../mappers/File.mapper'
import { UploadApiResponse } from 'cloudinary'

@Injectable()
export class FileRepositoryImpl implements FileRepository {
    constructor(
        private readonly cloudnaryService: CloudinaryService,
        private readonly fileMapper: FileMapper,
    ) {}

    async uploadMetadataFile(
        file: File,
    ): ResultadoAssincrono<FileRepositoryExceptions, File> {
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
            await this.cloudnaryService.uploadNoCloudinary(file)

        if (uploadResult.ehFalha()) {
            return ResultadoUtil.falha(uploadResult.erro)
        }

        return ResultadoUtil.sucesso(uploadResult.valor)
    }
}
