import { Column, Entity } from 'typeorm'

@Entity()
export class Avaliacoes {
    // @ObjectIdColumn()
    // _id: ObjectID // ID da avaliação (chave primária)

    @Column()
    material_id: number // ID do material (chave estrangeira)

    @Column()
    usuario_id: number // ID do usuário (chave estrangeira)

    @Column()
    valor_avaliacao: number // Valor da avaliação

    @Column()
    criado_em: Date // Data de criação
}
