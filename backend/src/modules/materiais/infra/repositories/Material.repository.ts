import { ResultadoAssincrono, ResultadoUtil } from 'http-service-result'
import {
    MaterialRepository,
    MaterialRepositoryExceptions,
} from '../../dominio/repositories/Material.repository'
import { Material } from '../../dominio/models/Materiais.model'
import { MaterialMapper } from '../mappers/Material.mapper'
import { RepositorioSemDadosExcecao, ServicoExcecao } from 'http-service-result'
import { Injectable } from '@nestjs/common'
import { MaterialModel } from '../models/Materiais.model'
import { In } from 'typeorm'

@Injectable()
export class MaterialRepositoryImpl implements MaterialRepository {
    constructor(private readonly materialMapper: MaterialMapper) {}
    async salvar(
        material: Material,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material> {
        try {
            const model = this.materialMapper.domainToModel(material)
            await model.save()

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao salvar material:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao('Erro ao salvar material'),
            )
        }
    }

    async deletarMaterial(
        material_id: number,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, void> {
        const model = await MaterialModel.delete({ material_id: material_id })
        if (!model) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Material não encontrado'),
            )
        }

        return ResultadoUtil.sucesso()
    }

    async buscarMaterialPorId(
        material_id: number,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material> {
        const model = await MaterialModel.findOne({
            where: { material_id: material_id },
        })

        if (!model) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Material não encontrado'),
            )
        }

        const domain = this.materialMapper.modelToDomain(model)
        if (domain.ehFalha()) {
            return ResultadoUtil.falha(domain.erro)
        }

        return ResultadoUtil.sucesso(domain.valor)
    }

    async buscarMateriaisPorUsuario(
        usuario_id: number,
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]> {
        const model = await MaterialModel.find({
            where: { usuario_id: usuario_id },
        })

        if (!model) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Materiais não encontrados'),
            )
        }

        const domain = this.materialMapper.modelToDomainList(model)
        if (domain.ehFalha()) {
            return ResultadoUtil.falha(domain.erro)
        }

        return ResultadoUtil.sucesso(domain.valor)
    }

    async buscarMateriaisPorCategoria(
        categoria: string[],
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]> {
        const model = await MaterialModel.find({
            where: { categoria_id: In(categoria) },
        })

        if (!model) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Materiais não encontrados'),
            )
        }

        const domain = this.materialMapper.modelToDomainList(model)
        if (domain.ehFalha()) {
            return ResultadoUtil.falha(domain.erro)
        }

        return ResultadoUtil.sucesso(domain.valor)
    }
    async buscarMateriaisPorNivel(
        nivel: string[],
    ): ResultadoAssincrono<MaterialRepositoryExceptions, Material[]> {
        const model = await MaterialModel.find({
            where: { nivel_id: In(nivel) },
        })

        if (!model) {
            return ResultadoUtil.falha(
                new RepositorioSemDadosExcecao('Materiais não encontrados'),
            )
        }

        const domain = this.materialMapper.modelToDomainList(model)
        if (domain.ehFalha()) {
            return ResultadoUtil.falha(domain.erro)
        }

        return ResultadoUtil.sucesso(domain.valor)
    }
}
