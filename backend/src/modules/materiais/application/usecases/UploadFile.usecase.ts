import { Inject } from '@nestjs/common'
import { FileRepository } from '../../dominio/repositories/File.repository'
import { UploadFileDTO } from '../dtos/FIle.dto'
import { FileMapperApplication } from '../mappers/File.mapper'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'

type UploadUsecaseExceptions = PropriedadesInvalidasExcecao | RepositorioExcecao

export class UploadFileUsecase {
    constructor(
        @Inject('FileRepository')
        private readonly fileRepository: FileRepository,
        private readonly fileMapper: FileMapperApplication,
    ) {}

    /**
     * Faz o upload de um arquivo para o Cloudinary e salva os metadados no banco de dados.
     * @param file Arquivo a ser enviado.
     * @param metadata Metadados do arquivo.
     * @returns Resultado sucesso ou uma falha.
     */
    async execute(
        file: Express.Multer.File,
        metadata: UploadFileDTO,
    ): ResultadoAssincrono<UploadUsecaseExceptions, void> {
        const result = await this.fileRepository.uploadNoCloudinary(file)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        metadata.url = result.valor.secure_url
        metadata.tamanho_arquivo = result.valor.bytes
        metadata.tipo_arquivo = result.valor.format
        metadata.cloudinary_id = result.valor.public_id

        const metadataDomain = this.fileMapper.toDomain(metadata)
        if (metadataDomain.ehFalha()) {
            return ResultadoUtil.falha(metadataDomain.erro)
        }

        const resultMetadata = await this.fileRepository.uploadMetadataFile(
            metadataDomain.valor,
        )

        if (resultMetadata.ehFalha()) {
            return ResultadoUtil.falha(resultMetadata.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
