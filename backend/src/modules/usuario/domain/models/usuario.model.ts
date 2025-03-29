import { ResultadoUtil, Resultado } from 'src/utils/result'
import { UsuarioRepositoryExceptions } from '../repositories/usuario.repository'
import { PropriedadesInvalidasExcecao } from 'src/utils/exception'

export interface CriarUsuarioProps {
    nomeUsuario: string
    email: string
    hashSenha: string
    primeiroNome: string
    sobrenome: string
    nivelInglesId: number
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
    private _created_at: Date
    private _updated_at: Date
    private _ativo: boolean

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

        return ResultadoUtil.obterResultado(
            [
                setNomeUsuario,
                setEmail,
                setHashSenha,
                setPrimeiroNome,
                setSobrenome,
                setNivelInglesId,
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
                setAtivo,
                setCreatedAt,
                setUpdatedAt,
            ],
            usuario,
        )
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
        if (!email || email.trim().length < 3) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Email inválido.'),
            )
        }
        this._email = email
        return ResultadoUtil.sucesso()
    }

    private setHashSenha(
        hashSenha: string,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!hashSenha || hashSenha.trim().length < 3) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Senha inválida.'),
            )
        }
        this._hashSenha = hashSenha
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
        if (!urlAvatar || urlAvatar.trim().length < 3) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('URL do avatar inválida.'),
            )
        }
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
        if (!pontos) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Pontos inválidos.'),
            )
        }
        this._pontos = pontos
        return ResultadoUtil.sucesso()
    }

    private setAtivo(
        ativo: boolean,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!ativo) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Ativo inválido.'),
            )
        }
        this._ativo = ativo
        return ResultadoUtil.sucesso()
    }

    private setCreatedAt(
        created_at: Date,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!created_at) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Data de criação invalida.'),
            )
        }
        this._created_at = created_at
        return ResultadoUtil.sucesso()
    }

    private setUpdatedAt(
        updated_at: Date,
    ): Resultado<UsuarioRepositoryExceptions, void> {
        if (!updated_at) {
            return ResultadoUtil.falha(
                new PropriedadesInvalidasExcecao('Data de alteração inválida.'),
            )
        }
        this._updated_at = updated_at
        return ResultadoUtil.sucesso()
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
}
