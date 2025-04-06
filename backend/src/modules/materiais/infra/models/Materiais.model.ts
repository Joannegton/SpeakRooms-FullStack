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
    Index,
} from 'typeorm'
import { Length, IsNotEmpty } from 'class-validator'
import { UsuarioModel } from '../../../core/infra/models/Usuario.model'
import { NivelModel } from '../../../core/infra/models/Niveis.model'
import { CategoriaModel } from '../../../core/infra/models/Categorias.model'
import { FileModel } from './Files.model'

@Entity('materiais')
export class MaterialModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    material_id: number

    @Column({ length: 255 })
    @Length(1, 255, { message: 'O título deve ter entre 1 e 255 caracteres.' })
    titulo: string

    @Column({ type: 'text' })
    descricao: string

    @Column()
    @IsNotEmpty({ message: 'O usuario_id não pode estar vazio.' })
    usuario_id: number

    @Column()
    @IsNotEmpty({ message: 'O nível não pode estar vazio.' })
    nivel_id: number

    @Column()
    @IsNotEmpty({ message: 'A categoria não pode estar vazia.' })
    categoria_id: number

    @Column({ length: 50 })
    @Length(1, 50, { message: 'A duração deve ter entre 1 e 50 caracteres.' })
    duracao: string

    @CreateDateColumn()
    criado_em: Date

    @UpdateDateColumn()
    atualizado_em: Date

    @Column({ default: false })
    @Index()
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
