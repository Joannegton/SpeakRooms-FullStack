import { Inject } from '@nestjs/common'
import { MaterialRepository } from '../../dominio/repositories/Material.repository'
import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
    RepositorioSemDadosExcecao,
} from 'http-service-result'
import { MaterialDto } from '../dtos/Material.dto'
import { MaterialMapperApplication } from '../mappers/Material.mapper'

type buscarMaterialPorIdQueryExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export class buscarMaterialPorIdQuery {
    constructor(
        @Inject('MaterialRepository')
        private readonly materialRepository: MaterialRepository,
        private readonly materialMapper: MaterialMapperApplication,
    ) {}

    async execute(
        material_id: number,
    ): ResultadoAssincrono<buscarMaterialPorIdQueryExceptions, MaterialDto> {
        const resultado =
            await this.materialRepository.buscarMaterialPorId(material_id)
        if (resultado.ehFalha()) {
            return ResultadoUtil.falha(resultado.erro)
        }

        const materialDto = this.materialMapper.toDto(resultado.valor)
        return ResultadoUtil.sucesso(materialDto)
    }
}
