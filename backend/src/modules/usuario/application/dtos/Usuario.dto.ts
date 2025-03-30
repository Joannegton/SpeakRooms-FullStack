export interface UsuarioDto {
    usuario_id: number
    nomeUsuario: string
    email: string
    senha: string
    primeiroNome: string
    sobrenome: string
    nivelInglesId: number
    urlAvatar?: string
    pontos?: number
    ativo?: boolean
    created_at?: Date
    updated_at?: Date
}
