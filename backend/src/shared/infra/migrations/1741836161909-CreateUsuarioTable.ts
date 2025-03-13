import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsuarioTable1741836161909 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'usuarios',
                columns: [
                    {
                        name: 'usuario_id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'nome_usuario',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'hash_senha',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'primeiro_nome',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'sobrenome',
                        type: 'varchar',
                        length: '50',
                        isNullable: false,
                    },
                    {
                        name: 'url_avatar',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'nivel_ingles_id',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'criado_em',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'atualizado_em',
                        type: 'timestamp',
                        default: 'CURRENT_TIMESTAMP',
                        onUpdate: 'CURRENT_TIMESTAMP',
                    },
                    {
                        name: 'esta_ativo',
                        type: 'boolean',
                        default: true,
                    },
                    {
                        name: 'pontos',
                        type: 'int',
                        default: 0,
                    },
                ],
                foreignKeys: [
                    {
                        columnNames: ['nivel_ingles_id'],
                        referencedTableName: 'niveis',
                        referencedColumnNames: ['nivel_id'],
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usuarios')
    }
}
