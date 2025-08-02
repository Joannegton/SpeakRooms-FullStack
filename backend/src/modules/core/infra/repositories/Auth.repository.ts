import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Usuario } from 'src/modules/core/domain/models/Usuario.model'
import { UsuarioRepository } from 'src/modules/core/domain/repositories/Usuario.repository'
import {
    PropriedadesInvalidasExcecao,
    ServicoExcecao,
    ResultadoAssincrono,
    ResultadoUtil,
} from 'http-service-result'
import {
    AutenticacaoResult,
    AutenticarExcecoes,
    AutenticarProps,
    AuthRepository,
} from '../../domain/repositories/Auth.repository'
import { HashService } from '../../domain/services/Hash.service'
import { RefreshToken } from '../../domain/models/RefreshToken.model'
import { RefreshTokenRepository } from '../../domain/repositories/RefreshToken.repository'
import { randomBytes } from 'crypto'

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('HashService')
        private readonly hashService: HashService,
        @Inject('RefreshTokenRepository')
        private readonly refreshTokenRepository: RefreshTokenRepository,
        private readonly jwtService: JwtService,
    ) {}

    async autenticar(
        credenciais: AutenticarProps,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult> {
        try {
            if (!credenciais.emailOuUsuario)
                return ResultadoUtil.falha(
                    new PropriedadesInvalidasExcecao('Usuário inválido'),
                )

            const isSenhaValida = await this.hashService.comparePassword(
                credenciais.senha,
                credenciais.usuario.hashSenha,
            )

            if (!isSenhaValida) {
                return ResultadoUtil.falha(
                    new PropriedadesInvalidasExcecao('Credenciais inválidas'),
                )
            }

            return this.gerarToken(credenciais.usuario)
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Credenciais inválidas'),
            )
        }
    }

    private async gerarToken(
        usuario: Usuario,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult> {
        try {
            const payload = {
                usuario_id: usuario.id,
                email: usuario.email,
                nome_usuario: usuario.nomeUsuario,
            }

            const token = await this.jwtService.signAsync(
                {
                    encrypt: this.hashService.encryptString(
                        JSON.stringify(payload),
                    ),
                },
                {
                    secret: process.env.JWT_SECRET,
                    algorithm: 'HS256',
                    expiresIn: process.env.JWT_EXPIRATION,
                },
            )

            const refreshTokenString = randomBytes(64).toString('hex')
            const refreshTokenExpiration = new Date()
            refreshTokenExpiration.setTime(
                refreshTokenExpiration.getTime() +
                    this.parseExpirationTime(
                        process.env.JWT_REFRESH_EXPIRATION || '7d',
                    ),
            )

            const refreshToken = RefreshToken.criar({
                token: refreshTokenString,
                usuarioId: usuario.id,
                expiresAt: refreshTokenExpiration,
            })

            if (refreshToken.ehFalha()) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Erro ao criar refresh token'),
                )
            }

            await this.refreshTokenRepository.revogarTodosDoUsuario(usuario.id)

            const savedRefreshToken = await this.refreshTokenRepository.save(
                refreshToken.valor,
            )
            if (savedRefreshToken.ehFalha()) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Erro ao salvar refresh token'),
                )
            }

            return ResultadoUtil.sucesso({
                access_token: token,
                refresh_token: refreshTokenString,
                usuario_id: usuario.id,
                email: usuario.email,
                nome_usuario: usuario.nomeUsuario,
            })
        } catch (error) {
            console.error('Erro ao gerar token:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao(
                    'Sessão invalida, favor realizar o login novamente.',
                ),
            )
        }
    }

    async gerarJwtMomentaneo(
        usuarioId: number,
    ): ResultadoAssincrono<ServicoExcecao, string> {
        try {
            const payload = { usuarioId }
            const token = await this.jwtService.signAsync(payload, {
                secret: process.env.JWT_SECRET,
                algorithm: 'HS256',
                expiresIn: '10m',
            })
            return ResultadoUtil.sucesso(token)
        } catch (error) {
            console.error('Erro ao gerar JWT momentâneo:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao('Erro ao gerar JWT momentâneo'),
            )
        }
    }

    async renovarToken(
        refreshTokenString: string,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult> {
        try {
            const refreshTokenResult =
                await this.refreshTokenRepository.findByToken(
                    refreshTokenString,
                )
            if (refreshTokenResult.ehFalha()) {
                return ResultadoUtil.falha(
                    new PropriedadesInvalidasExcecao('Refresh token inválido'),
                )
            }

            if (!refreshTokenResult.valor.estaValido()) {
                return ResultadoUtil.falha(
                    new PropriedadesInvalidasExcecao(
                        'Refresh token expirado ou revogado',
                    ),
                )
            }

            const usuarioResult = await this.usuarioRepository.findById(
                refreshTokenResult.valor.usuarioId,
            )
            if (usuarioResult.ehFalha()) {
                return ResultadoUtil.falha(
                    new PropriedadesInvalidasExcecao('Usuário não encontrado'),
                )
            }

            return this.gerarToken(usuarioResult.valor)
        } catch (error) {
            console.error('Erro ao renovar token:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao('Erro interno ao renovar token'),
            )
        }
    }

    async revogarRefreshToken(
        refreshTokenString: string,
    ): ResultadoAssincrono<ServicoExcecao, void> {
        try {
            const refreshTokenResult =
                await this.refreshTokenRepository.findByToken(
                    refreshTokenString,
                )
            if (refreshTokenResult.ehFalha()) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Refresh token não encontrado'),
                )
            }

            const refreshToken = refreshTokenResult.valor
            refreshToken.revogar()

            const saveResult =
                await this.refreshTokenRepository.save(refreshToken)
            if (saveResult.ehFalha()) {
                return ResultadoUtil.falha(
                    new ServicoExcecao('Erro ao revogar refresh token'),
                )
            }

            return ResultadoUtil.sucesso()
        } catch (error) {
            console.error('Erro ao revogar refresh token:', error)
            return ResultadoUtil.falha(
                new ServicoExcecao('Erro interno ao revogar refresh token'),
            )
        }
    }

    private parseExpirationTime(expiration: string): number {
        const unit = expiration.slice(-1)
        const value = parseInt(expiration.slice(0, -1))

        switch (unit) {
            case 's':
                return value * 1000
            case 'm':
                return value * 60 * 1000
            case 'h':
                return value * 60 * 60 * 1000
            case 'd':
                return value * 24 * 60 * 60 * 1000
            default:
                return 7 * 24 * 60 * 60 * 1000 // 7 dias por padrão
        }
    }
}
