export class RecuperarSenhaDto {
    id: number
    usuarioId: number
    token: string
    expiracao: Date
    criadoEm: Date
    atualizadoEm: Date
}
