import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { FileRepository } from '../../dominio/repositories/File.repository'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'
import { Inject } from '@nestjs/common'

export type ArquivoUseCaseExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export class DeletarArquivoUseCase {
    constructor(
        @Inject('FileRepository')
        private readonly fileRepository: FileRepository,
    ) {}

    async execute(
        material_id: number,
    ): ResultadoAssincrono<ArquivoUseCaseExceptions, void> {
        const result = await this.fileRepository.deleteFile(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
