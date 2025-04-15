import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'

@Entity('interesses')
export class InteressesModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    interesse_id: number

    @Column({ length: 50 })
    descricao: string

    @ManyToMany(() => UsuarioModel, (usuario) => usuario.interesses)
    usuarios: UsuarioModel[]
}
