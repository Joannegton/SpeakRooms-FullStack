import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'
import { File } from '../../dominio/models/File.model'
import { FileDto, UploadFileDTO } from '../dtos/FIle.dto'
import { Resultado, ResultadoUtil } from 'src/utils/result'

export type FileMapperExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class FileMapperApplication {
    toDto(dominio: File): FileDto {
        return {
            url: dominio.url,
            cloudinary_id: dominio.cloudinary_id,
            tipo_arquivo: dominio.tipo_arquivo,
            tamanho_arquivo: dominio.tamanho_arquivo,
            enviado_em: dominio.enviado_em,
            usuario_id: dominio.usuario_id,
            id: dominio.id,
        }
    }

    toDomain(dto: UploadFileDTO): Resultado<FileMapperExceptions, File> {
        const domainResult = File.criar(
            dto.material_id,
            dto.usuario_id,
            dto.cloudinary_id,
            dto.url,
            dto.tipo_arquivo,
            dto.tamanho_arquivo,
        )

        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }

        return ResultadoUtil.sucesso(domainResult.valor)
    }
}
