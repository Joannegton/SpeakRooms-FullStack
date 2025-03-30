import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { UsuarioModel } from './Usuario.model'
import { MaterialModel } from './Materiais.model'

@Entity('niveis')
export class NivelModel {
    @PrimaryGeneratedColumn()
    nivel_id: number

    @Column({ length: 50 })
    nome_nivel: string

    @Column({ length: 10 })
    codigo_nivel: string

    @Column({ type: 'text', nullable: true })
    descricao: string

    @OneToMany(() => UsuarioModel, (usuario) => usuario.nivel)
    usuarios: UsuarioModel[]

    @OneToMany(() => MaterialModel, (material) => material.nivel)
    materiais: MaterialModel[]
}
