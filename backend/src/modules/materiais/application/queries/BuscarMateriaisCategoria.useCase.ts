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

type BuscarMateriaisCategoriaQueryExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export class BuscarMateriaisCategoriaQuery {
    constructor(
        @Inject('MaterialRepository')
        private readonly materialRepository: MaterialRepository,
        private readonly materialMapper: MaterialMapperApplication,
    ) {}

    async execute(
        categoriasId: string[],
    ): ResultadoAssincrono<
        BuscarMateriaisCategoriaQueryExceptions,
        MaterialDto[]
    > {
        const resultado =
            await this.materialRepository.buscarMateriaisPorCategoria(
                categoriasId,
            )
        if (resultado.ehFalha()) {
            return ResultadoUtil.falha(resultado.erro)
        }

        const materialDto = this.materialMapper.toDtoList(resultado.valor)
        return ResultadoUtil.sucesso(materialDto)
    }
}
