import { Column, Entity } from 'typeorm'
@Entity()
export class ComentarioModel {
    // @ObjectIdColumn()
    // _id: ObjectID // ID do comentário (chave primária)

    @Column()
    material_id: number // ID do material (chave estrangeira)

    @Column()
    usuario_id: number // ID do usuário (chave estrangeira)

    @Column()
    conteudo: string // Conteúdo do comentário

    @Column()
    criado_em: Date // Data de criação

    @Column()
    atualizado_em: Date // Data de atualização
}
