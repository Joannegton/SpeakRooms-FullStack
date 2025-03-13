import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm'
import { UsuarioModel } from './Usuario.model'
import { MaterialModel } from './Materiais.model'

@Entity('favoritos_materiais')
export class MaterialBookmarkModel {
    @PrimaryGeneratedColumn()
    favorito_id: number // ID do favorito (chave primária)

    @Column()
    material_id: number // ID do material (chave estrangeira)

    @ManyToOne(() => MaterialModel, (material) => material.favoritos)
    @JoinColumn({ name: 'material_id' })
    material: MaterialModel // Relacionamento com a tabela de materiais

    @Column()
    usuario_id: number // ID do usuário (chave estrangeira)

    @ManyToOne(() => UsuarioModel, (usuario) => usuario.favoritos)
    @JoinColumn({ name: 'usuario_id' })
    usuario: UsuarioModel // Relacionamento com a tabela de usuários

    @Column()
    favoritado_em: Date // Data em que foi favoritado
}
