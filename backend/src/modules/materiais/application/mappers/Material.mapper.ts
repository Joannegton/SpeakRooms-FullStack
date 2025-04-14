import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'

import { Resultado, ResultadoUtil } from 'src/utils/result'
import { Material } from '../../dominio/models/Materiais.model'
import { CriarMaterialDTO, MaterialDto } from '../dtos/Material.dto'

export type MaterialMapperExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class MaterialMapperApplication {
    toDto(dominio: Material): MaterialDto {
        return {
            categoria_id: dominio.categoria_id,
            descricao: dominio.descricao,
            aprovado: dominio.aprovado,
            atualizado_em: dominio.atualizado_em,
            criado_em: dominio.criado_em,
            nivel_id: dominio.nivel_id,
            titulo: dominio.titulo,
            usuario_id: dominio.usuario_id,
            duracao: dominio.duracao,
            destaque: dominio.destaque,
            recomendado: dominio.recomendado,
            id: dominio.id,
        }
    }

    toDtoList(domains: Material[]): MaterialDto[] {
        return domains.map((domain) => this.toDto(domain))
    }

    toDomain(
        dto: CriarMaterialDTO,
    ): Resultado<MaterialMapperExceptions, Material> {
        const domainResult = Material.criar(
            dto.titulo,
            dto.descricao,
            dto.usuario_id,
            dto.nivel_id,
            dto.categoria_id,
            dto.duracao,
        )

        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }

        return ResultadoUtil.sucesso(domainResult.valor)
    }
}
