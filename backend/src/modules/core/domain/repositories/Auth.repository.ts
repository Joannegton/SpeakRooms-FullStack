import { Usuario } from 'src/modules/core/domain/models/Usuario.model'
import {
    PropriedadesInvalidasExcecao,
    ServicoExcecao,
    ResultadoAssincrono,
} from 'http-service-result'

export interface AutenticarProps {
    usuario: Usuario
    emailOuUsuario: string
    senha: string
}

export interface AutenticacaoResult {
    access_token: string
    refresh_token: string
    nome_usuario: string
}

export type AutenticarExcecoes = PropriedadesInvalidasExcecao | ServicoExcecao

export interface AuthRepository {
    autenticar(
        credenciais: AutenticarProps,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult>
    gerarJwtMomentaneo(
        usuarioId: number,
    ): ResultadoAssincrono<ServicoExcecao, string>
    renovarToken(
        refreshToken: string,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult>
    revogarRefreshToken(
        refreshToken: string,
    ): ResultadoAssincrono<ServicoExcecao, void>
}
