import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
} from 'typeorm'
import { MaterialModel } from './Materiais.model'

@Entity('arquivos')
export class FileModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    arquivo_id: number

    @Column()
    material_id: number

    @Column({ length: 255 })
    nome_arquivo: string

    @Column({ length: 255 })
    url: string

    @Column({ length: 50 })
    tipo_arquivo: string

    @Column()
    tamanho_arquivo: number

    @Column()
    enviado_em: Date

    @ManyToOne(() => MaterialModel, (material) => material.arquivos)
    @JoinColumn({ name: 'material_id' })
    material: MaterialModel
}
