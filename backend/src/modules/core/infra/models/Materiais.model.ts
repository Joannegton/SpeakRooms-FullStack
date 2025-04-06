import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
    BaseEntity,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'
import { NivelModel } from './Niveis.model'
import { CategoriaModel } from './Categorias.model'
import { FileModel } from './Files.model'

@Entity('materiais')
export class MaterialModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    material_id: number

    @Column({ length: 255 })
    titulo: string

    @Column({ type: 'text' })
    descricao: string

    @Column()
    usuario_id: number

    @Column()
    nivel_id: number

    @Column()
    categoria_id: number

    @Column({ length: 50 })
    duracao: string

    @CreateDateColumn()
    criado_em: Date

    @UpdateDateColumn()
    atualizado_em: Date

    @Column({ default: false })
    aprovado: boolean

    @Column({ default: false })
    destaque: boolean

    @Column({ default: false })
    recomendado: boolean

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.materiais)
    @JoinColumn({ name: 'usuario_id' })
    autor: UsuarioModel

    @ManyToOne(() => NivelModel, (nivel) => nivel.materiais)
    @JoinColumn({ name: 'nivel_id' })
    nivel: NivelModel

    @OneToMany(() => FileModel, (arquivo) => arquivo.material)
    arquivos: FileModel[]

    @ManyToOne(() => CategoriaModel, (categoria) => categoria.materiais)
    @JoinColumn({ name: 'categoria_id' })
    categoria: CategoriaModel
}
