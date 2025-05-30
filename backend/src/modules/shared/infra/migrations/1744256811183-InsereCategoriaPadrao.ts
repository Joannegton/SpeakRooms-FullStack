import { MigrationInterface, QueryRunner } from 'typeorm'

export class InsereCategoriaPadrao1744256811183 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            INSERT INTO categorias (nome_categoria, descricao)
            VALUES 
                ('Aulas de Inglês', 'Categorias relacionadas a aulas de inglês'),
                ('Materiais Didáticos', 'Materiais de apoio para aprendizado de inglês'),
                ('Conversação', 'Práticas de conversação em inglês'),
                ('Gramática', 'Estudo de regras gramaticais do inglês'),
                ('Vocabulário', 'Expansão de vocabulário em inglês'),
                ('Tecnologia', 'Categorias relacionadas a tecnologia e inovação'),
                ('Negócios', 'Tópicos relacionados ao mundo dos negócios e empreendedorismo'),
                ('Viagens', 'Categorias relacionadas a viagens e turismo'),
                ('Saúde', 'Tópicos relacionados à saúde e bem-estar'),
                ('Esportes', 'Categorias relacionadas a esportes e atividades físicas'),
                ('Culinária', 'Tópicos sobre gastronomia e culinária'),
                ('Entretenimento', 'Categorias relacionadas a filmes, música e lazer');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DELETE FROM categorias
            WHERE nome_categoria IN (
                'Aulas de Inglês',
                'Materiais Didáticos',
                'Conversação',
                'Gramática',
                'Vocabulário',
                'Tecnologia',
                'Negócios',
                'Viagens',
                'Saúde',
                'Esportes',
                'Culinária',
                'Entretenimento'
            );
        `)
    }
}
