import { Inject } from '@nestjs/common'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import { CriarMaterialDTO, MaterialDto } from '../dtos/Material.dto'
import { MaterialRepository } from '../../dominio/repositories/Material.repository'
import { MaterialMapperApplication } from '../mappers/Material.mapper'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'

type CriarMaterialUsecaseExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao

export class CriarMaterialUsecase {
    constructor(
        @Inject('MaterialRepository')
        private readonly materialRepository: MaterialRepository,
        private readonly materialMapperApplication: MaterialMapperApplication,
    ) {}

    async execute(
        material: CriarMaterialDTO,
    ): ResultadoAssincrono<CriarMaterialUsecaseExceptions, MaterialDto> {
        const materialDomain = this.materialMapperApplication.toDomain(material)
        if (materialDomain.ehFalha()) {
            return ResultadoUtil.falha(materialDomain.erro)
        }

        const result = await this.materialRepository.salvar(
            materialDomain.valor,
        )
        if (result.ehFalha()) {
            return ResultadoUtil.falha(result.erro)
        }

        return ResultadoUtil.sucesso(result.valor)
    }
}
