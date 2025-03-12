import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity('usuario')
export class UsuarioModel {
    @PrimaryColumn({ name: 'id' })
    id: string

    @Column({ name: 'nome' })
    nome: string

    @Column({ name: 'email' })
    email: string

    @Column({ name: 'senha' })
    senha: string
}
