import { TentativaLogin } from '../models/TentativaLogin.model'
import { RepositorioExcecao, ResultadoAssincrono } from 'http-service-result'

export interface ValidarLoginProps {
    ipAddress: string
    userAgent?: string
    usuarioId?: number
}

export interface ContarTentativasFalhaProps {
    ipAddress: string
    usuarioId?: number
    minutosAtras?: number
}

export interface LimparTentativasProps {
    usuarioId?: number
    ipAddress?: string
}

export type TentativaLoginRepositoryExceptions = RepositorioExcecao

export interface TentativaLoginRepository {
    limparTentativas(
        props: LimparTentativasProps,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, void>
    validarTentativaLogin(
        props: ValidarLoginProps,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, void>

    registrarTentativaLogin(
        props: TentativaLogin,
    ): ResultadoAssincrono<TentativaLoginRepositoryExceptions, void>
}
