import { Column, Entity } from 'typeorm'

@Entity()
export class ChatMessages {
    // @ObjectIdColumn()
    // _id: ObjectID // ID da mensagem (chave primária)

    @Column()
    remetente_id: number // ID do remetente (chave estrangeira)

    @Column()
    destinatario_id: number // ID do destinatário (chave estrangeira)

    @Column()
    mensagem: string // Conteúdo da mensagem

    @Column()
    enviada_em: Date // Data de envio
}
