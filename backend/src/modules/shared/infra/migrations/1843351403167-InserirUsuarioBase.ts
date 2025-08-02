import { MigrationInterface, QueryRunner } from 'typeorm'

export class InserirUsuarioBase1843351403167 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO usuarios (nome_usuario, email, hash_senha, primeiro_nome, sobrenome, nivel_ingles_id)
            VALUES ('Joannegton', 'wel@gmail.com', '$2a$12$hoDTB.OdjjXebQc0O.8KZua/raBSJuVbXlXox8bXnzbSHIAejeuy2', 'Wellington', 'Silva', 1)
            `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM niveis WHERE codigo_nivel IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C2+')
        `)
    }
}
