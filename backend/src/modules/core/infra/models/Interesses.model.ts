import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'
import { Usuario } from '../../domain/models/usuario.model'

@Entity('interesses')
export class InteressesModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    interesse_id: number

    @Column({ length: 50 })
    descricao: string

    @ManyToMany(() => UsuarioModel, (Usuario) => Usuario.interesses_id)
    usuarios: Usuario[]
}
