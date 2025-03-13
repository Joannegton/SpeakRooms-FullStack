import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'
import { NivelModel } from './Niveis.model'
import { CategoriaModel } from './Categorias.model'
import { ArquivoModel } from './Files.model'
import { MaterialBookmarkModel } from './FavoritosMateriais.model'

@Entity('materiais')
export class MaterialModel {
    @PrimaryGeneratedColumn()
    material_id: number // ID do material (chave primária)

    @Column({ length: 255 })
    titulo: string // Título do material

    @Column({ type: 'text' })
    descricao: string // Descrição do material

    @Column()
    autor_id: number // ID do autor (chave estrangeira)

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.materiais)
    @JoinColumn({ name: 'autor_id' })
    autor: UsuarioModel // Relacionamento com a tabela de usuários

    @Column()
    nivel_id: number // ID do nível (chave estrangeira)

    @ManyToOne(() => NivelModel, (nivel) => nivel.materiais)
    @JoinColumn({ name: 'nivel_id' })
    nivel: NivelModel // Relacionamento com a tabela de níveis

    @Column()
    categoria_id: number // ID da categoria (chave estrangeira)

    @ManyToOne(() => CategoriaModel, (categoria) => categoria.materiais)
    @JoinColumn({ name: 'categoria_id' })
    categoria: CategoriaModel // Relacionamento com a tabela de categorias

    @Column({ length: 50 })
    duracao: string // Duração do material

    @CreateDateColumn()
    criado_em: Date // Data de criação

    @UpdateDateColumn()
    atualizado_em: Date // Data de atualização

    @Column({ default: false })
    esta_aprovado: boolean // Indica se o material foi aprovado

    @Column({ default: false })
    esta_destaque: boolean // Indica se o material é destacado

    @Column({ default: false })
    esta_recomendado: boolean // Indica se o material é recomendado

    @OneToMany(() => ArquivoModel, (arquivo) => arquivo.material)
    arquivos: ArquivoModel[] // Relacionamento com a tabela de arquivos

    @OneToMany(() => MaterialBookmarkModel, (bookmark) => bookmark.material)
    favoritos: MaterialBookmarkModel[] // Relacionamento com a tabela de favoritos
}
