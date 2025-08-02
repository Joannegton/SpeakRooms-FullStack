import { Resultado, ResultadoUtil } from 'http-service-result'
import { PropriedadesInvalidasExcecao } from 'http-service-result'
interface RecuperarSenhaCarregarProps {
    usuarioId: number
    token: string
    expiracao: Date
    criadoEm: Date
    atualizadoEm: Date
}

export class RecuperarSenha {
    private readonly _id: number
    private _usuarioId: number
    private _token: string
    private _expiracao: Date
    private _criadoEm: Date
    private _atualizadoEm: Date

    private constructor(id?: number) {
        this._id = id
    }

    public static criar(
        usuarioId: number,
        id?: number,
    ): Resultado<PropriedadesInvalidasExcecao, RecuperarSenha> {
        const instancia = new RecuperarSenha(id)
        const setUsuarioId = instancia.setUsuarioId(usuarioId)
        const setToken = instancia.setToken()
        const setExpiracao = instancia.setExpiracao()

        return ResultadoUtil.obterResultado(
            [setUsuarioId, setToken, setExpiracao],
            instancia,
        )
    }

    public static carregar(
        props: RecuperarSenhaCarregarProps,
        id: number,
    ): Resultado<PropriedadesInvalidasExcecao, RecuperarSenha> {
        const instancia = new RecuperarSenha(id)
        const setUsuarioId = instancia.setUsuarioId(props.usuarioId)
        const setToken = instancia.setToken(props.token)
        const setExpiracao = instancia.setExpiracao(props.expiracao)
        const setCriadoEm = instancia.setCriadoEm(props.criadoEm)
        const setAtualizadoEm = instancia.setAtualizadoEm(props.atualizadoEm)

        return ResultadoUtil.obterResultado(
            [
                setUsuarioId,
                setToken,
                setExpiracao,
                setCriadoEm,
                setAtualizadoEm,
            ],
            instancia,
        )
    }

    public validarToken(
        usuarioId: number,
        token: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (this._usuarioId !== usuarioId) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Token não pertence ao usuário informado',
                ),
            )
        }

        if (this._token !== token) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Token inválido ou expirado'),
            )
        }

        if (this._expiracao < new Date()) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Token expirado'),
            )
        }

        return ResultadoUtil.sucesso()
    }

    private setUsuarioId(
        usuarioId: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!usuarioId || usuarioId <= 0) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('ID do usuário inválido.'),
            )
        }
        this._usuarioId = usuarioId
        return ResultadoUtil.sucesso()
    }

    private setToken(
        token?: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        const tokenGerado =
            token || Math.floor(100000 + Math.random() * 900000).toString()
        if (!tokenGerado)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Token inválido.'),
            )
        this._token = tokenGerado
        return ResultadoUtil.sucesso()
    }

    private setExpiracao(
        expiracao?: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        const agora = new Date()
        const expiracaoGerada =
            expiracao || new Date(agora.getTime() + 60 * 1000) // 1 minuto
        if (!expiracaoGerada || expiracaoGerada <= agora) {
            console.log(expiracaoGerada, agora)
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Expiração inválida.'),
            )
        }
        this._expiracao = expiracaoGerada
        return ResultadoUtil.sucesso()
    }

    private setCriadoEm(
        criado_em: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!criado_em) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Data inválida.'),
            )
        }
        this._criadoEm = criado_em
        return ResultadoUtil.sucesso()
    }

    private setAtualizadoEm(
        atualizadoEm: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!atualizadoEm) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Data inválida.'),
            )
        }
        this._atualizadoEm = atualizadoEm
        return ResultadoUtil.sucesso()
    }

    public get id(): number {
        return this._id
    }
    public get usuarioId(): number {
        return this._usuarioId
    }
    public get token(): string {
        return this._token
    }
    public get expiracao(): Date {
        return this._expiracao
    }
    public get criadoEm(): Date {
        return this._criadoEm
    }
    public get atualizadoEm(): Date {
        return this._atualizadoEm
    }
}
