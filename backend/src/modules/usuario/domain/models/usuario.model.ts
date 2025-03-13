import { R, Result } from 'src/utils/result'
import { UsuarioRepositoryExceptions } from '../repositories/usuario.repository'
import { InvalidPropsException } from 'src/utils/exception'

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
    ): Result<UsuarioRepositoryExceptions, Usuario> {
        const usuario = new Usuario()
        const setNomeUsuario = usuario.setNomeUsuario(props.nomeUsuario)
        const setEmail = usuario.setEmail(props.email)
        const setHashSenha = usuario.setHashSenha(props.hashSenha)
        const setPrimeiroNome = usuario.setPrimeiroNome(props.primeiroNome)
        const setSobrenome = usuario.setSobrenome(props.sobrenome)
        const setNivelInglesId = usuario.setNivelInglesId(props.nivelInglesId)

        return R.getResult(
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
    ): Result<UsuarioRepositoryExceptions, Usuario> {
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

        return R.getResult(
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
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!nomeUsuario || nomeUsuario.trim().length < 3) {
            return R.failure(
                new InvalidPropsException('Nome de usuário inválido.'),
            )
        }
        this._nomeUsuario = nomeUsuario
        return R.ok()
    }

    private setEmail(email: string): Result<UsuarioRepositoryExceptions, void> {
        if (!email || email.trim().length < 3) {
            return R.failure(new InvalidPropsException('Email inválido.'))
        }
        this._email = email
        return R.ok()
    }

    private setHashSenha(
        hashSenha: string,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!hashSenha || hashSenha.trim().length < 3) {
            return R.failure(new InvalidPropsException('Senha inválida.'))
        }
        this._hashSenha = hashSenha
        return R.ok()
    }

    private setPrimeiroNome(
        primeiroNome: string,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!primeiroNome || primeiroNome.trim().length < 3) {
            return R.failure(
                new InvalidPropsException('Primeiro nome inválido.'),
            )
        }
        this._primeiroNome = primeiroNome
        return R.ok()
    }

    private setSobrenome(
        sobrenome: string,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!sobrenome || sobrenome.trim().length < 3) {
            return R.failure(new InvalidPropsException('Sobrenome inválido.'))
        }
        this._sobrenome = sobrenome
        return R.ok()
    }

    private setUrlAvatar(
        urlAvatar: string,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!urlAvatar || urlAvatar.trim().length < 3) {
            return R.failure(
                new InvalidPropsException('URL do avatar inválida.'),
            )
        }
        this._urlAvatar = urlAvatar
        return R.ok()
    }

    private setNivelInglesId(
        nivelInglesId: number,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!nivelInglesId) {
            return R.failure(
                new InvalidPropsException('Nível de inglês inválido.'),
            )
        }
        this._nivelInglesId = nivelInglesId
        return R.ok()
    }

    private setPontos(
        pontos: number,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!pontos) {
            return R.failure(new InvalidPropsException('Pontos inválidos.'))
        }
        this._pontos = pontos
        return R.ok()
    }

    private setAtivo(
        ativo: boolean,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!ativo) {
            return R.failure(new InvalidPropsException('Ativo inválido.'))
        }
        this._ativo = ativo
        return R.ok()
    }

    private setCreatedAt(
        created_at: Date,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!created_at) {
            return R.failure(
                new InvalidPropsException('Data de criação invalida.'),
            )
        }
        this._created_at = created_at
        return R.ok()
    }

    private setUpdatedAt(
        updated_at: Date,
    ): Result<UsuarioRepositoryExceptions, void> {
        if (!updated_at) {
            return R.failure(
                new InvalidPropsException('Data de alteração inválida.'),
            )
        }
        this._updated_at = updated_at
        return R.ok()
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
