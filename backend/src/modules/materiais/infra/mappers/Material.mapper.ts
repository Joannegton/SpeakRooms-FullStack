import { Resultado, ResultadoUtil } from 'src/utils/result'
import { Material } from '../../dominio/models/Materiais.model'
import { MaterialRepositoryExceptions } from '../../dominio/repositories/Material.repository'
import { MaterialModel } from '../models/Materiais.model'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MaterialMapper {
    public modelToDomain(
        model: MaterialModel,
    ): Resultado<MaterialRepositoryExceptions, Material> {
        if (!model)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Material Invalido..'),
            )

        const domain = Material.carregar(
            model.material_id,
            model.titulo,
            model.descricao,
            model.usuario_id,
            model.nivel_id,
            model.categoria_id,
            model.duracao,
            model.criado_em,
            model.atualizado_em,
            model.aprovado,
            model.destaque,
            model.recomendado,
        )

        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        return ResultadoUtil.sucesso(domain.valor)
    }

    public domainToModel(domain: Material): MaterialModel {
        if (!domain) {
            throw new Error('Domain object is undefined or null.')
        }

        const model = MaterialModel.create({
            titulo: domain.titulo,
            descricao: domain.descricao ?? undefined,
            usuario_id: domain.usuario_id,
            nivel_id: domain.nivel_id,
            categoria_id: domain.categoria_id,
            duracao: domain.duracao ?? undefined,
        })

        return model
    }
}
