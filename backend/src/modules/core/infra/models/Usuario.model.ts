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
    ManyToMany,
    JoinTable,
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
import { MaterialModel } from '../../../materiais/infra/models/Materiais.model'
import { InteressesModel } from './Interesses.model'

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

    @Column({ type: 'int', array: true, default: [] })
    @IsInt({ each: true })
    interesses_id: number[]

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Column({ default: true })
    @IsBoolean()
    ativo: boolean

    @ManyToOne(() => NivelModel, (nivel) => nivel.usuarios)
    @JoinColumn({ name: 'nivel_ingles_id' })
    nivel: NivelModel

    @OneToMany(() => MaterialModel, (material) => material.autor)
    materiais: MaterialModel[]

    @ManyToMany(() => InteressesModel, (interesse) => interesse.usuarios)
    @JoinTable({
        name: 'usuarios_interesses',
        joinColumn: { name: 'usuario_id', referencedColumnName: 'usuario_id' },
        inverseJoinColumn: {
            name: 'interesse_id',
            referencedColumnName: 'interesse_id',
        },
    })
    interesses: InteressesModel[]
}
