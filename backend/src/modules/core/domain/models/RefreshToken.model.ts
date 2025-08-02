import {
    PropriedadesInvalidasExcecao,
    ResultadoUtil,
    Resultado,
} from 'http-service-result'

export interface CriarRefreshTokenProps {
    token: string
    usuarioId: number
    expiresAt: Date
    ipAddress?: string
    deviceInfo?: string
}

export interface CarregarRefreshTokenProps {
    token: string
    usuarioId: number
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    revogado: boolean
    ipAddress?: string
    deviceInfo?: string
}

export class RefreshToken {
    private readonly _id: number
    private _token: string
    private _usuarioId: number
    private _expiresAt: Date
    private _revogado: boolean
    private _deviceInfo?: string
    private _ipAddress?: string
    private _createdAt: Date
    private _updatedAt: Date

    private constructor(id?: number) {
        this._id = id
    }

    public static criar(
        props: CriarRefreshTokenProps,
    ): Resultado<PropriedadesInvalidasExcecao, RefreshToken> {
        const refreshToken = new RefreshToken()

        const setToken = refreshToken.setToken(props.token)
        const setUsuarioId = refreshToken.setUsuarioId(props.usuarioId)
        const setExpiresAt = refreshToken.setExpiresAt(props.expiresAt)
        const setDeviceInfo = refreshToken.setDeviceInfo(props.deviceInfo)
        const setIpAddress = refreshToken.setIpAddress(props.ipAddress)

        return ResultadoUtil.obterResultado(
            [setToken, setUsuarioId, setExpiresAt, setDeviceInfo, setIpAddress],
            refreshToken,
        )
    }
    public static carregar(
        props: CarregarRefreshTokenProps,
        id: number,
    ): Resultado<PropriedadesInvalidasExcecao, RefreshToken> {
        const refreshToken = new RefreshToken(id)
        const setToken = refreshToken.setToken(props.token)
        const setUsuarioId = refreshToken.setUsuarioId(props.usuarioId)
        const setExpiresAt = refreshToken.setExpiresAt(props.expiresAt)
        const setCreatedAt = refreshToken.setCreatedAt(props.createdAt)
        const setUpdatedAt = refreshToken.setUpdatedAt(props.updatedAt)
        const setRevogado = refreshToken.setRevogado(props.revogado)
        const setDeviceInfo = refreshToken.setDeviceInfo(props.deviceInfo)
        const setIpAddress = refreshToken.setIpAddress(props.ipAddress)

        return ResultadoUtil.obterResultado(
            [
                setToken,
                setUsuarioId,
                setExpiresAt,
                setCreatedAt,
                setUpdatedAt,
                setRevogado,
                setDeviceInfo,
                setIpAddress,
            ],
            refreshToken,
        )
    }

    private setToken(
        token: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!token || token.trim().length === 0) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Token é obrigatório'),
            )
        }
        this._token = token
        return ResultadoUtil.sucesso()
    }

    private setUsuarioId(
        usuarioId: number,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!usuarioId || usuarioId <= 0) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('ID do usuário é obrigatório'),
            )
        }
        this._usuarioId = usuarioId
        return ResultadoUtil.sucesso()
    }

    private setExpiresAt(
        expiresAt: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!expiresAt || expiresAt <= new Date()) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Data de expiração deve ser futura',
                ),
            )
        }
        this._expiresAt = expiresAt
        return ResultadoUtil.sucesso()
    }

    private setCreatedAt(
        createdAt: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!createdAt) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Data de criação é obrigatória',
                ),
            )
        }
        this._createdAt = createdAt
        return ResultadoUtil.sucesso()
    }

    private setUpdatedAt(
        updatedAt: Date,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        if (!updatedAt) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao(
                    'Data de atualização é obrigatória',
                ),
            )
        }
        this._updatedAt = updatedAt
        return ResultadoUtil.sucesso()
    }

    private setRevogado(
        revogado: boolean,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._revogado = revogado
        return ResultadoUtil.sucesso()
    }

    private setDeviceInfo(
        deviceInfo: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._deviceInfo = deviceInfo
        return ResultadoUtil.sucesso()
    }

    private setIpAddress(
        ipAddress: string,
    ): Resultado<PropriedadesInvalidasExcecao, void> {
        this._ipAddress = ipAddress
        return ResultadoUtil.sucesso()
    }

    public revogar(): void {
        this._revogado = true
        this._updatedAt = new Date()
    }

    public marcarUso(): void {
        this._updatedAt = new Date()
    }

    public static revogarTodos(tokens: RefreshToken[]): RefreshToken[] {
        const tokensRevogados: RefreshToken[] = []

        for (const token of tokens) {
            if (!token.estaRevogado()) {
                token.revogar()
                tokensRevogados.push(token)
            }
        }

        return tokensRevogados
    }

    public static revogarTodosAtivos(tokens: RefreshToken[]): RefreshToken[] {
        return tokens.filter((token) => {
            if (!token.estaRevogado() && token.estaValido()) {
                token.revogar()
                return true
            }
            return false
        })
    }

    public estaExpirado(): boolean {
        return new Date() > this._expiresAt
    }

    public estaRevogado(): boolean {
        return this._revogado
    }

    public estaValido(): boolean {
        return !this.estaExpirado() && !this.estaRevogado()
    }

    public podeSerUsadoPorDispositivo(deviceInfo?: string): boolean {
        if (!this._deviceInfo || !deviceInfo) {
            return true // Se não há info do dispositivo, permite uso
        }
        return this._deviceInfo === deviceInfo
    }

    public podeSerUsadoPorIP(ipAddress?: string): boolean {
        if (!this._ipAddress || !ipAddress) {
            return true //TODO usar ip Se não há info do IP, permite uso
        }
        return this._ipAddress === ipAddress
    }

    // Getters
    public get id(): number {
        return this._id
    }

    public get token(): string {
        return this._token
    }

    public get usuarioId(): number {
        return this._usuarioId
    }

    public get expiresAt(): Date {
        return this._expiresAt
    }

    public get createdAt(): Date {
        return this._createdAt
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }

    public get revogado(): boolean {
        return this._revogado
    }

    public get deviceInfo(): string | undefined {
        return this._deviceInfo
    }

    public get ipAddress(): string | undefined {
        return this._ipAddress
    }
}
