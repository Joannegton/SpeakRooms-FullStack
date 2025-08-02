import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Index,
    BaseEntity,
} from 'typeorm'

@Entity('refresh_tokens')
export class RefreshTokenModel extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'varchar', length: 500, unique: true })
    @Index()
    token: string

    @Column({ name: 'usuario_id', type: 'int' })
    @Index()
    usuarioId: number

    @Column({ name: 'expires_at', type: 'timestamp' })
    expiresAt: Date

    @Column({ type: 'boolean', default: false })
    revogado: boolean

    @Column({
        name: 'device_info',
        type: 'varchar',
        length: 500,
        nullable: true,
    })
    deviceInfo?: string

    @Column({ name: 'ip_address', type: 'varchar', length: 45, nullable: true })
    ipAddress?: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}
