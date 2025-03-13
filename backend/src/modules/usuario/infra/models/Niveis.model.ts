import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UsuarioModel } from './Usuario.model'
import { MaterialModel } from './Materiais.model'

@Entity('niveis')
export class NivelModel {
    @PrimaryGeneratedColumn()
    nivel_id: number // ID do nível (chave primária)

    @Column({ length: 50 })
    nome_nivel: string // Nome do nível

    @Column({ length: 10 })
    codigo_nivel: string // Código do nível

    @Column({ type: 'text', nullable: true })
    descricao: string // Descrição do nível

    @OneToMany(() => UsuarioModel, (usuario) => usuario.nivel)
    usuarios: UsuarioModel[] // Relacionamento com a tabela de usuários

    @OneToMany(() => MaterialModel, (material) => material.nivel)
    materiais: MaterialModel[] // Relacionamento com a tabela de materiais
}
