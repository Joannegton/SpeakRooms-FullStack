import { ResultadoUtil, Resultado } from 'src/utils/result'
import { UsuarioRepositoryExceptions } from '../repositories/usuario.repository'
import {
    PropriedadesInvalidasExcecao,
    UsuarioBloqueadoException,
} from 'src/utils/exception'

export interface CriarUsuarioProps {
    nomeUsuario: string
    email: string
    hashSenha: string
    primeiroNome: string
    sobrenome: string
    nivelInglesId: number
    interessesId: number[]
}

export interface CarregarUsuarioProps {
    nomeUsuario: string
    email: string
    hashSenha: string
    primeiroNome: string
    sobrenome: string
    urlAvatar?: string
    nivelInglesId: number
    pontos: number
    interessesId: number[]
    created_at: Date
    updated_at: Date
    ativo: boolean
}

export class Usuario {
    private _id: number
    private _nomeUsuario: string
    private _email: string
    private _hashSenha: string
    private _primeiroNome: string
    private _sobrenome: string
    private _urlAvatar?: string
    private _nivelInglesId: number
    private _pontos: number
    private _interessesId: number[]
    private _created_at: Date
    private _updated_at: Date
    private _ativo: boolean
    private _quantidadeTentativasLogin: number = 0
    private _hashRecuperarSenha: string
    private _bloqueado: boolean = false

    private constructor(id?: number) {
        this._id = id
    }

    public static criar(
        props: CriarUsuarioProps,
    ): Resultado<UsuarioRepositoryExceptions, Usuario> {
        const usuario = new Usuario()
        const setNomeUsuario = usuario.setNomeUsuario(props.nomeUsuario)
        const setEmail = usuario.setEmail(props.email)
        const setHashSenha = usuario.setHashSenha(props.hashSenha)
        const setPrimeiroNome = usuario.setPrimeiroNome(props.primeiroNome)
        const setSobrenome = usuario.setSobrenome(props.sobrenome)
        const setNivelInglesId = usuario.setNivelInglesId(props.nivelInglesId)
        const setInteressesId = usuario.setInteressesId(props.interessesId)

        return ResultadoUtil.obterResultado(
            [
                setNomeUsuario,
                setEmail,
                setHashSenha,
                setPrimeiroNome,
                setSobrenome,
                setNivelInglesId,
                setInteressesId,
            ],
            usuario,
        )
    }

    public static carregar(
        props: CarregarUsuarioProps,
        id: number,
    ): Resultado<UsuarioRepositoryExceptions, Usuario> {
        const usuario = new Usuario(id)
        const setNomeUsuario = usuario.setNomeUsuario(props.nomeUsuario)
        const setEmail = usuario.setEmail(props.email)
        const setHashSenha = usuario.setHashSenha(props.hashSenha)
        const setPrimeiroNome = usuario.setPrimeiroNome(props.primeiroNome)
        const setSobrenome = usuario.setSobrenome(props.sobrenome)
        const setUrlAvatar = usuario.setUrlAvatar(props.urlAvatar)
        const setNivelInglesId = usuario.setNivelInglesId(props.nivelInglesId)
        const setPontos = usuario.setPontos(props.pontos)
        const setCreatedAt = usuario.setCreatedAt(props.created_at)
        const setUpdatedAt = usuario.setUpdatedAt(props.updated_at)
        const setAtivo = usuario.setAtivo(props.ativo)
        const setInteressesId = usuario.setInteressesId(props.interessesId)

        return ResultadoUtil.obterResultado(
            [
                setNomeUsuario,
                setEmail,
                setHashSenha,
                setPrimeiroNome,
                setSobrenome,
                setUrlAvatar,
                setNivelInglesId,
                setPontos,
                setInteressesId,
                setAtivo,
                setCreatedAt,
                setUpdatedAt,
            ],
            usuario,
        )
    }

    private setHashSenha(
        hashSenha: string,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!hashSenha || hashSenha.trim().length < 5) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Senha inválida.'),
            )
        }

        this._hashSenha = hashSenha
        return ResultadoUtil.sucesso()
    }

    private setNomeUsuario(
        nomeUsuario: string,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!nomeUsuario || nomeUsuario.trim().length < 3) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Nome de usuário inválido.'),
            )
        }
        this._nomeUsuario = nomeUsuario
        return ResultadoUtil.sucesso()
    }

    private setEmail(
        email: string,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Email inválido.'),
            )
        }
        this._email = email
        return ResultadoUtil.sucesso()
    }

    private setPrimeiroNome(
        primeiroNome: string,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!primeiroNome || primeiroNome.trim().length < 3) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Primeiro nome inválido.'),
            )
        }
        this._primeiroNome = primeiroNome
        return ResultadoUtil.sucesso()
    }

    private setSobrenome(
        sobrenome: string,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!sobrenome || sobrenome.trim().length < 3) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Sobrenome inválido.'),
            )
        }
        this._sobrenome = sobrenome
        return ResultadoUtil.sucesso()
    }

    private setUrlAvatar(
        urlAvatar: string,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        this._urlAvatar = urlAvatar
        return ResultadoUtil.sucesso()
    }

    private setNivelInglesId(
        nivelInglesId: number,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!nivelInglesId) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Nível de inglês inválido.'),
            )
        }
        this._nivelInglesId = nivelInglesId
        return ResultadoUtil.sucesso()
    }

    private setPontos(
        pontos: number,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        this._pontos = pontos
        return ResultadoUtil.sucesso()
    }

    private setInteressesId(
        interessesId: number[],
    ): Resultado<UsuarioRepositoryExceptions, void> {
        console.log('interesses domain', interessesId)
        this._interessesId = interessesId
        return ResultadoUtil.sucesso()
    }

    private setAtivo(
        ativo: boolean,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        this._ativo = ativo
        return ResultadoUtil.sucesso()
    }

    private setCreatedAt(
        created_at: Date,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        this._created_at = created_at
        return ResultadoUtil.sucesso()
    }

    private setUpdatedAt(
        updated_at: Date,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        this._updated_at = updated_at
        return ResultadoUtil.sucesso()
    }
    //talvez não funcione pois tem que adc um novo campo no banco
    incrementarTentativasLogin(
        bloqueado: boolean,
    ): Resultado<UsuarioBloqueadoException, void> {
        this._quantidadeTentativasLogin++
        if (this._quantidadeTentativasLogin === 3 && !bloqueado) {
            return ResultadoUtil.falha(
                new UsuarioBloqueadoException(
                    'Usuário bloqueado. Favor entre em /esqueci-senha para desbloquear.',
                ),
            )
        }

        return ResultadoUtil.sucesso()
    }

    // melhorar implementação
    bloquearUsuario(): void {
        this._hashSenha = ''
        this._hashRecuperarSenha = 'MelhorarAqui'
        this._bloqueado = true
    }

    get id(): number {
        return this._id
    }

    get nomeUsuario(): string {
        return this._nomeUsuario
    }

    get email(): string {
        return this._email
    }

    get hashSenha(): string {
        return this._hashSenha
    }

    get primeiroNome(): string {
        return this._primeiroNome
    }

    get sobrenome(): string {
        return this._sobrenome
    }

    get urlAvatar(): string {
        return this._urlAvatar
    }

    get nivelInglesId(): number {
        return this._nivelInglesId
    }

    get nomeCompleto(): string {
        return `${this._primeiroNome} ${this._sobrenome}`
    }

    get pontos(): number {
        return this._pontos
    }

    get ativo(): boolean {
        return this._ativo
    }

    get created_at(): Date {
        return this._created_at
    }

    get updated_at(): Date {
        return this._updated_at
    }

    get hashRecuperarSenha(): string {
        return this._hashRecuperarSenha
    }

    get bloqueado(): boolean {
        return this._bloqueado
    }

    get interessesId(): number[] {
        return this._interessesId
    }

    get quantidadeTentativasLogin(): number {
        return this._quantidadeTentativasLogin
    }
}
