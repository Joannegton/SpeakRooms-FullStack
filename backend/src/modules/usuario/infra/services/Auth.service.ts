import { Usuario } from 'src/modules/usuario/domain/models/usuario.model'
import {
    PropriedadesInvalidasExcecao,
    ServicoExcecao,
} from 'src/utils/exception'
import { ResultadoAssincrono } from 'src/utils/result'

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
}
