import { MigrationInterface, QueryRunner } from 'typeorm'

export class InserirValorPadraoNivelIngles1743351403167
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO niveis (nome_nivel, codigo_nivel, descricao)
            VALUES 
                ('Iniciante', 'A1', 'Nível básico de inglês, onde o aluno aprende frases simples e vocabulário básico.'),
                ('Básico', 'A2', 'Nível básico de inglês, onde o aluno aprende frases simples e vocabulário básico.'),
                ('Intermediário', 'B1', 'Nível intermediário de inglês, onde o aluno pode se comunicar em situações cotidianas e entender textos simples.'),
                ('Intermediário Avançado', 'B2', 'Nível intermediário avançado de inglês, onde o aluno pode se comunicar em situações mais complexas e entender textos mais elaborados.'),
                ('Avançado', 'C1', 'Nível avançado de inglês, onde o aluno pode se comunicar fluentemente e entender textos complexos.'),
                ('Fluente', 'C2', 'Nível fluente de inglês, onde o aluno pode se comunicar com nativos e entender nuances culturais.'),
                ('Nativo', 'C2+', 'Nível nativo de inglês, onde o aluno tem domínio total da língua e pode se comunicar como um falante nativo.')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM niveis WHERE codigo_nivel IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'C2+')
        `)
    }
}
