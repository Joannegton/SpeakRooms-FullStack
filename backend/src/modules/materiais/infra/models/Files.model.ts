import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity,
    CreateDateColumn,
} from 'typeorm'
import { MaterialModel } from './Materiais.model'
import { UsuarioModel } from 'src/modules/core/infra/models/Usuario.model'

@Entity('arquivos')
export class FileModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    arquivo_id: number

    @Column({ unique: true })
    material_id: number

    @Column()
    usuario_id: number

    @Column({ length: 255 })
    cloudinary_id: string

    @Column({ length: 255 })
    url: string

    @Column({ length: 50 })
    tipo_arquivo: string

    @Column()
    tamanho_arquivo: number

    @CreateDateColumn()
    enviado_em: Date

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.usuario_id)
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioModel

    @ManyToOne(() => MaterialModel, (material) => material.arquivos)
    @JoinColumn({ name: 'material_id' })
    material: MaterialModel
}
