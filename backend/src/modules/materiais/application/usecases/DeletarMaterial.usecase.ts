import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import { Inject } from '@nestjs/common'
import { MaterialRepository } from '../../dominio/repositories/Material.repository'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'

export type MaterialUseCaseExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export class DeletarMaterialUseCase {
    constructor(
        @Inject('MaterialRepository')
        private readonly fileRepository: MaterialRepository,
    ) {}

    async execute(
        material_id: number,
    ): ResultadoAssincrono<MaterialUseCaseExceptions, void> {
        const result = await this.fileRepository.deletarMaterial(material_id)
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return ResultadoUtil.sucesso()
    }
}
