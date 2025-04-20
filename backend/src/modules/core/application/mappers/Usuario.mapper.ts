import { ResultadoUtil, Resultado } from 'src/utils/result'
import { Usuario } from '../../domain/models/Usuario.model'
import {
    AtualizarUsuarioDto,
    CriarUsuarioDto,
    UsuarioDto,
} from '../dtos/Usuario.dto'
import {
    PropriedadesInvalidasExcecao,
    RepositorioExcecao,
} from 'src/utils/exception'

export type UsuarioMapperExceptions =
    | RepositorioExcecao
    | PropriedadesInvalidasExcecao

export class UsuarioMapperApplication {
    toDto(dominio: Usuario): UsuarioDto {
        return {
            usuario_id: dominio.id,
            nomeUsuario: dominio.nomeUsuario,
            email: dominio.email,
            primeiroNome: dominio.primeiroNome,
            sobrenome: dominio.sobrenome,
            urlAvatar: dominio.urlAvatar,
            nivelInglesId: dominio.nivelInglesId,
            interessesId: dominio.interessesId,
            pontos: dominio.pontos,
            created_at: dominio.created_at,
            updated_at: dominio.updated_at,
            ativo: dominio.ativo,
        }
    }

    toDomain(
        dto: CriarUsuarioDto,
    ): Resultado<UsuarioMapperExceptions, Usuario> {
        const domainResult = Usuario.criar({
            nomeUsuario: dto.nomeUsuario,
            email: dto.email,
            senha: dto.senha,
            primeiroNome: dto.primeiroNome,
            sobrenome: dto.sobrenome,
            nivelInglesId: dto.nivelInglesId,
            interessesId: dto.interessesId,
        })

        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }

        return ResultadoUtil.sucesso(domainResult.valor)
    }

    toDomainUpdate(
        id: number,
        dto: AtualizarUsuarioDto,
    ): Resultado<UsuarioMapperExceptions, Usuario> {
        const domainResult = Usuario.atualizar(id, {
            primeiroNome: dto.primeiroNome,
            sobrenome: dto.sobrenome,
            nivelInglesId: dto.nivelInglesId,
            interessesId: dto.interessesId,
            urlAvatar: dto.urlAvatar,
            ativo: dto.ativo,
        })
        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }
        return ResultadoUtil.sucesso(domainResult.valor)
    }
}
