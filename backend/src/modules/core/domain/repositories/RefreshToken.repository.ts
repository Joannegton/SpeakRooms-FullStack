import { RefreshToken } from '../models/RefreshToken.model'
import { RepositorioExcecao, ResultadoAssincrono } from 'http-service-result'

export type RefreshTokenRepositoryExceptions = RepositorioExcecao

export interface RefreshTokenRepository {
    save(
        refreshToken: RefreshToken,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, void>
    findByToken(
        token: string,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, RefreshToken>
    findByUsuarioId(
        usuarioId: number,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, RefreshToken[]>
    revogarTodosDoUsuario(
        usuarioId: number,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, void>
    delete(
        id: number,
    ): ResultadoAssincrono<RefreshTokenRepositoryExceptions, void>
}
