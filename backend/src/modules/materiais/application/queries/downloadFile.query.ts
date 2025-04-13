import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { FileRepository } from '../../dominio/repositories/File.repository'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { FileMapperApplication } from '../mappers/File.mapper'
import { FileDto } from '../dtos/FIle.dto'
import { Inject } from '@nestjs/common'

type DownloadFileQueryExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class DownloadFileQuery {
    constructor(
        @Inject('FileRepository')
        private readonly fileRepository: FileRepository,
        private readonly fileMapper: FileMapperApplication,
    ) {}

    async execute(
        material_id: number,
    ): ResultadoAssincrono<DownloadFileQueryExceptions, FileDto> {
        const result = await this.fileRepository.downloadFile(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        const fileDto = this.fileMapper.toDto(result.valor.metadata)
        fileDto.arquivo = result.valor.arquivo

        return ResultadoUtil.sucesso(fileDto)
    }
}
