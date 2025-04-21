import { UsuarioModel } from 'src/modules/core/infra/models/Usuario.model'
import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    ManyToOne,
    JoinColumn,
    JoinTable,
} from 'typeorm'

@Entity('sessao_aprendizagem')
export class SessaoAprendizagemModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar', { length: 100 })
    titulo: string

    @Column('varchar', { nullable: true, length: 255 })
    descricao?: string

    @Column('simple-array', { default: '' })
    participantes_id: number[]

    @Column('date')
    dataHoraInicio: Date

    @Column('date')
    dataHoraFim: Date

    @Column('varchar', { length: 255 })
    linkVideo: string

    @Column('enum', { enum: ['agendada', 'concluida', 'cancelada'] })
    status: 'agendada' | 'concluida' | 'cancelada'

    @CreateDateColumn()
    criadoEm: Date

    @UpdateDateColumn()
    atualizadoEm: Date

    @ManyToMany(() => UsuarioModel, (usuario) => usuario.sessoesParticipadas)
    @JoinTable({
        name: 'sessao_participantes', // tabela intermediária
        joinColumn: { name: 'sessao_id', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'usuario_id',
            referencedColumnName: 'usuario_id',
        },
    })
    participantes: UsuarioModel[]

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.usuario_id)
    @JoinColumn({ name: 'criador_id' })
    criador: UsuarioModel
}
