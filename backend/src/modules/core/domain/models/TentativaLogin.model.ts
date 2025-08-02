import {
    PropriedadesInvalidasExcecao,
    ResultadoUtil,
    Resultado,
} from 'http-service-result'

export interface CriarTentativaLoginProps {
    ipAddress: string
    userAgent?: string
    usuarioId?: number
    sucesso: boolean
    motivoFalha?: string
}

export interface CarregarTentativaLoginProps {
    ipAddress: string
    userAgent?: string
    usuarioId?: number
    sucesso: boolean
    motivoFalha?: string
    tentativaEm: Date
}

export class TentativaLogin {
    private readonly _id: string
    private _ipAddress: string
    private _userAgent?: string
    private _usuarioId?: number
    private _sucesso: boolean
    private _motivoFalha?: string
    private _tentativaEm: Date

    private constructor(id?: string) {
        this._id = id
    }

    public static criar(
        props: CriarTentativaLoginProps,
    ): Resultado<PropriedadesInvalidasExcecao, TentativaLogin> {
        const tentativa = new TentativaLogin()

        const setIpAddressaddress = tentativa.setIpAddress(props.ipAddress)
        const setUserAgent = tentativa.setUserAgent(props.userAgent)
        const setUsuarioId = tentativa.setUsuarioId(props.usuarioId)
        const setSucesso = tentativa.setSucesso(props.sucesso)
        const setMotivoFalha = tentativa.setMotivoFalha(props.motivoFalha)

        return ResultadoUtil.obterResultado(
            [
                setIpAddressaddress,
                setUserAgent,
                setUsuarioId,
                setSucesso,
                setMotivoFalha,
            ],
            tentativa,
        )
    }

    public static carregar(
        props: CarregarTentativaLoginProps,
        id: string,
    ): Resultado<PropriedadesInvalidasExcecao, TentativaLogin> {
        const tentativa = new TentativaLogin(id)

        const setIpAddress = tentativa.setIpAddress(props.ipAddress)
        const setUserAgent = tentativa.setUserAgent(props.userAgent)
        const setUsuarioId = tentativa.setUsuarioId(props.usuarioId)
        const setSucesso = tentativa.setSucesso(props.sucesso)
        const setMotivoFalha = tentativa.setMotivoFalha(props.motivoFalha)
        const setTentativaEm = tentativa.setTentativaEm(props.tentativaEm)

        return ResultadoUtil.obterResultado(
            [
                setIpAddress,
                setUserAgent,
                setUsuarioId,
                setSucesso,
                setMotivoFalha,
                setTentativaEm,
            ],
            tentativa,
        )
    }

    private setIpAddress(
        ipAddress: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!ipAddress) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('IP Address é obrigatório'),
            )
        }
        this._ipAddress = ipAddress
        return ResultadoUtil.sucesso()
    }

    private setUserAgent(
        userAgent?: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._userAgent = userAgent
        return ResultadoUtil.sucesso()
    }

    private setUsuarioId(
        usuarioId?: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._usuarioId = usuarioId
        return ResultadoUtil.sucesso()
    }

    private setSucesso(
        sucesso: boolean,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (typeof sucesso !== 'boolean') {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Sucesso deve ser um booleano',
                ),
            )
        }
        this._sucesso = sucesso
        return ResultadoUtil.sucesso()
    }

    private setMotivoFalha(
        motivoFalha?: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._motivoFalha = motivoFalha
        return ResultadoUtil.sucesso()
    }

    private setTentativaEm(
        tentativaEm: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._tentativaEm = tentativaEm
        return ResultadoUtil.sucesso()
    }

    public get id(): string {
        return this._id
    }

    public get ipAddress(): string {
        return this._ipAddress
    }

    public get userAgent(): string | undefined {
        return this._userAgent
    }

    public get usuarioId(): number {
        return this._usuarioId
    }

    public get sucesso(): boolean {
        return this._sucesso
    }

    public get motivoFalha(): string | undefined {
        return this._motivoFalha
    }

    public get tentativaEm(): Date {
        return this._tentativaEm
    }
}
