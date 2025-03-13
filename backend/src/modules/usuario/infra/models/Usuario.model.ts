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
import {
    IsEmail,
    IsNotEmpty,
    IsBoolean,
    IsInt,
    IsUrl,
    Min,
} from 'class-validator'
import { NivelModel } from './Niveis.model'
import { MaterialModel } from './Materiais.model'
import { MaterialBookmarkModel } from './FavoritosMateriais.model'

@Entity('usuarios')
export class UsuarioModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    usuario_id: number

    @Column({ length: 50 })
    @IsNotEmpty()
    nome_usuario: string

    @Column({ unique: true })
    @IsEmail()
    email: string

    @Column()
    @IsNotEmpty()
    hash_senha: string

    @Column({ length: 50 })
    @IsNotEmpty()
    primeiro_nome: string

    @Column({ length: 50 })
    @IsNotEmpty()
    sobrenome: string

    @Column({ nullable: true })
    @IsUrl()
    url_avatar: string

    @Column()
    @IsInt()
    nivel_ingles_id: number //chave estrangeira

    @Column({ type: 'int', default: 0 })
    @IsInt()
    @Min(0)
    pontos: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({ default: true })
    @IsBoolean()
    ativo: boolean

    @ManyToOne(() => NivelModel, (nivel) => nivel.usuarios)
    @JoinColumn({ name: 'nivel_ingles_id' })
    nivel: NivelModel // Relacionamento com a tabela de níveis

    @OneToMany(() => MaterialModel, (material) => material.autor)
    materiais: MaterialModel[] // Relacionamento com a tabela de materiais

    @OneToMany(() => MaterialBookmarkModel, (bookmark) => bookmark.usuario)
    favoritos: MaterialBookmarkModel[] // Relacionamento com a tabela de favoritos
}
