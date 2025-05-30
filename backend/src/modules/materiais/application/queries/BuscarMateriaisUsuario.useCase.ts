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

type BuscarMateriaisUsuarioQueryExceptions =
    | PropriedadesInvalidasExcecao
    | RepositorioExcecao
    | RepositorioSemDadosExcecao

export class BuscarMateriaisUsuarioQuery {
    constructor(
        @Inject('MaterialRepository')
        private readonly materialRepository: MaterialRepository,
        private readonly materialMapper: MaterialMapperApplication,
    ) {}

    async execute(
        usuario_id: number,
    ): ResultadoAssincrono<
        BuscarMateriaisUsuarioQueryExceptions,
        MaterialDto[]
    > {
        const resultado =
            await this.materialRepository.buscarMateriaisPorUsuario(usuario_id)
        if (resultado.ehFalha()) {
            return ResultadoUtil.falha(resultado.erro)
        }

        const materialDto = this.materialMapper.toDtoList(resultado.valor)
        return ResultadoUtil.sucesso(materialDto)
    }
}
