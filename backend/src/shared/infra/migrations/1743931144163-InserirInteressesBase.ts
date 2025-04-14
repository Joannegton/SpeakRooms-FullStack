import { MigrationInterface, QueryRunner } from 'typeorm'

export class InteressesBase1743931144163 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO interesses (descricao) 
            VALUES 
            ('Melhorar habilidades de conversação'),
            ('Expandir vocabulario'),
            ('Dominar gramática'),
            ('Melhorar pronuncia'),
            ('Inglês para negócios/trabalho'),
            ('Inglês para exames (TOEFL, IELTS, etc.)')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM interesses WHERE descricao IN (
                'Melhorar habilidades de conversação',
                'Expandir vocabulario',
                'Dominar gramática',
                'Melhorar pronuncia',
                'Inglês para negócios/trabalho',
                'Inglês para exames (TOEFL, IELTS, etc.)'
            )
        `)
    }
}
