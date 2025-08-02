import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    Index,
    BaseEntity,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'

@Entity({ name: 'tentativas_login' })
export class TentativaLoginModel extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'ip_address', type: 'varchar', length: 45 })
    @Index()
    ipAddress: string

    @Column({ name: 'user_agent', type: 'text', nullable: true })
    userAgent?: string

    @Column({ name: 'usuario_id', type: 'int', nullable: true })
    @Index()
    usuarioId?: number

    @Column({ type: 'boolean' })
    sucesso: boolean

    @Column({
        name: 'motivo_falha',
        type: 'varchar',
        length: 50,
        nullable: true,
    })
    motivoFalha?: string

    @CreateDateColumn({ name: 'tentativa_em' })
    tentativaEm: Date

    @ManyToOne(() => UsuarioModel)
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioModel
}
