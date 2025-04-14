import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
} from 'typeorm'
import { MaterialModel } from '../../../materiais/infra/models/Materiais.model'

@Entity('categorias')
export class CategoriaModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    categoria_id: number

    @Column({ length: 255 })
    nome_categoria: string

    @Column({ type: 'text', nullable: true })
    descricao: string

    @OneToMany(() => MaterialModel, (material) => material.categoria)
    materiais: MaterialModel[]
}
