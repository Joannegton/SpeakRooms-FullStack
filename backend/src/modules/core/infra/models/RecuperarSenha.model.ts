import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    BaseEntity,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'

@Entity('recuperar_senha')
export class RecuperarSenhaModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    usuario_id: number

    @Column()
    token: string

    @Column({ type: 'timestamp' })
    expiracao: Date

    @CreateDateColumn()
    criado_em: Date

    @UpdateDateColumn()
    atualizado_em: Date

    @OneToOne(() => UsuarioModel, (usuario) => usuario.usuario_id, {
        onDelete: 'CASCADE',
    })
    usuario: UsuarioModel
}
