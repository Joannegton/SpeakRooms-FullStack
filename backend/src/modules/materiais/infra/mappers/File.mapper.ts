import { Resultado, ResultadoUtil } from 'http-service-result'
import { File } from '../../dominio/models/File.model'
import { FileRepositoryExceptions } from '../../dominio/repositories/File.repository'
import { FileModel } from '../models/Files.model'
import { PropriedadesInvalidasExcecao } from 'http-service-result'

export class FileMapper {
    public modelToDomain(
        model: FileModel,
    ): Resultado<FileRepositoryExceptions, File> {
        if (!model)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Arquivo Invalido..'),
            )

        const domain = File.carregar(
            model.arquivo_id,
            model.material_id,
            model.usuario_id,
            model.cloudinary_id,
            model.url,
            model.tipo_arquivo,
            model.tamanho_arquivo,
            model.enviado_em,
        )

        if (domain.ehFalha()) return ResultadoUtil.falha(domain.erro)

        return ResultadoUtil.sucesso(domain.valor)
    }

    domainToModel(domain: File): FileModel {
        const model = FileModel.create({
            arquivo_id: domain.id,
            material_id: domain.material_id,
            usuario_id: domain.usuario_id,
            cloudinary_id: domain.cloudinary_id,
            url: domain.url,
            tipo_arquivo: domain.tipo_arquivo,
            tamanho_arquivo: domain.tamanho_arquivo,
            enviado_em: domain.enviado_em,
        })

        return model
    }
}
