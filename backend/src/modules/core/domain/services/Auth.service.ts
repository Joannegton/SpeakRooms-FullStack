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
    usuario_id: number
    email: string
    nome_usuario: string
}

export type AutenticarExcecoes = PropriedadesInvalidasExcecao | ServicoExcecao

export interface AuthService {
    autenticar(
        credenciais: AutenticarProps,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult>
    gerarToken(
        usuario: Usuario,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult>
    gerarJwtMomentaneo(
        usuarioId: number,
    ): ResultadoAssincrono<ServicoExcecao, string>
}
