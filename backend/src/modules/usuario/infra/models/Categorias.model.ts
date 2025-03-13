import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { MaterialModel } from './Materiais.model'

@Entity('categorias')
export class CategoriaModel {
    @PrimaryGeneratedColumn()
    categoria_id: number // ID da categoria (chave primária)

    @Column({ length: 255 })
    nome_categoria: string // Nome da categoria

    @Column({ type: 'text', nullable: true })
    descricao: string // Descrição da categoria

    @OneToMany(() => MaterialModel, (material) => material.categoria)
    materiais: MaterialModel[] // Relacionamento com a tabela de materiais
}
