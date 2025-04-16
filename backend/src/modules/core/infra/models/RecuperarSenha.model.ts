import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'

@Entity('recuperar_senha')
export class RecuperarSenha {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    usuario_id: string

    @Column()
    token: string

    @Column({ type: 'timestamp' })
    expiracao: Date

    @CreateDateColumn()
    criado_em: Date

    @UpdateDateColumn()
    atualizado_em: Date

    @OneToOne(() => UsuarioModel, (usuario) => usuario.recuperarSenha)
    usuario: UsuarioModel
}
