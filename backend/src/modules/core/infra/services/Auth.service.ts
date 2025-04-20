import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Usuario } from 'src/modules/core/domain/models/Usuario.model'
import { UsuarioRepository } from 'src/modules/core/domain/repositories/Usuario.repository'
import {
    PropriedadesInvalidasExcecao,
    ServicoExcecao,
} from 'src/utils/exception'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'
import {
    AutenticacaoResult,
    AutenticarExcecoes,
    AutenticarProps,
    AuthService,
} from '../../domain/services/Auth.service'
import { HashService } from '../../domain/services/Hash.service'

@Injectable()
export class AuthServiceImpl implements AuthService {
    constructor(
        @Inject('UsuarioRepository')
        private readonly usuarioRepository: UsuarioRepository,
        @Inject('HashService')
        private readonly hashService: HashService,
        private readonly jwtService: JwtService,
    ) {}

    async autenticar(
        credenciais: AutenticarProps,
    ): ResultadoAssincrono<AutenticarExcecoes, AutenticacaoResult> {
        try {
            if (!credenciais.usuario)
                return ResultadoUtil.falha(
                    new PropriedadesInvalidasExcecao('Usuário inválido'),
                )

            const isSenhaValida = await this.hashService.comparePassword(
                credenciais.senha,
                credenciais.usuario.hashSenha,
            )

            if (!isSenhaValida) {
                // arrumar
                const incrementarTentativas =
                    credenciais.usuario.incrementarTentativasLogin(
                        credenciais.usuario.bloqueado,
                    )
                if (incrementarTentativas.ehFalha())
                    credenciais.usuario.bloquearUsuario()

                const salvarUsuario = await this.usuarioRepository.save(
                    credenciais.usuario,
                )
                if (salvarUsuario.ehFalha())
                    return ResultadoUtil.falha(salvarUsuario.erro)

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

    async gerarToken(
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

            return ResultadoUtil.sucesso({
                access_token: token,
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
}
