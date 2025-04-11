import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import {
    MaterialRepository,
    MaterialRepositoryExceptions,
} from '../../dominio/repositories/Material.repository'
import { Material } from '../../dominio/models/Materiais.model'
import { MaterialMapper } from '../mappers/Material.mapper'
import { ServicoExcecao } from 'src/utils/exception'
import { Injectable } from '@nestjs/common'

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
}
