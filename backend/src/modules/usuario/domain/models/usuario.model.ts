export class Usuario {
    id: string
    nome: string
    email: string
    senha: string

    constructor(id: string, nome: string, email: string, senha: string) {
        this.id = id
        this.nome = nome
        this.email = email
        this.senha = senha
    }
}
