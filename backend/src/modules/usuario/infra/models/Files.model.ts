import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { MaterialModel } from './Materiais.model'

@Entity('arquivos')
export class ArquivoModel {
    @PrimaryGeneratedColumn()
    arquivo_id: number // ID do arquivo (chave primária)

    @Column()
    material_id: number // ID do material (chave estrangeira)

    @ManyToOne(() => MaterialModel, (material) => material.arquivos)
    @JoinColumn({ name: 'material_id' })
    material: MaterialModel // Relacionamento com a tabela de materiais

    @Column({ length: 255 })
    nome_arquivo: string // Nome do arquivo

    @Column({ length: 255 })
    caminho_arquivo: string // Caminho do arquivo

    @Column({ length: 50 })
    tipo_arquivo: string // Tipo do arquivo

    @Column()
    tamanho_arquivo: number // Tamanho do arquivo

    @Column()
    enviado_em: Date // Data de upload
}
