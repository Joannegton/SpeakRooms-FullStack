import { Column, Entity } from 'typeorm'

@Entity()
export class UserStatus {
    // @ObjectIdColumn()
    // _id: ObjectID; // ID do status (chave primária)

    @Column()
    usuario_id: number // ID do usuário (chave estrangeira)

    @Column()
    esta_online: boolean // Indica se o usuário está online

    @Column()
    ultima_vez_online: Date // Data da última atividade
}
