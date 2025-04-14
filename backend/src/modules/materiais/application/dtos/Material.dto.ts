import { ApiProperty } from '@nestjs/swagger'
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    IsOptional,
    Min,
    Max,
} from 'class-validator'

/**
 * DTO para criação de um material.
 */
export class CriarMaterialDTO {
    @ApiProperty({
        description: 'Título do material.',
        example: 'Introdução à Programação',
    })
    @IsString({ message: 'O nome do material deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome do material é obrigatório.' })
    titulo: string

    @ApiProperty({
        description: 'Descrição do material.',
        example: 'Este material aborda os conceitos básicos de programação.',
        required: false,
    })
    @IsString({ message: 'A descrição do material deve ser uma string.' })
    @IsOptional()
    descricao?: string

    @ApiProperty({
        description: 'ID do usuário associado ao material.',
        example: 1,
    })
    @IsNumber({}, { message: 'O ID do usuario inválido.' })
    @IsNotEmpty({ message: 'O ID do usuario é obrigatório.' })
    usuario_id: number

    @ApiProperty({
        description: 'ID do nível associado ao material.',
        example: 2,
    })
    @IsNumber({}, { message: 'O ID do nivel inválido.' })
    @IsNotEmpty({ message: 'O ID do nivel é obrigatório.' })
    nivel_id: number

    @ApiProperty({
        description: 'ID da categoria associada ao material.',
        example: 3,
    })
    @IsNumber({}, { message: 'O ID da categoria inválido.' })
    @IsNotEmpty({ message: 'O ID da categoria é obrigatório.' })
    categoria_id: number

    @ApiProperty({
        description: 'Duração do material em minutos.',
        example: 45,
        required: false,
    })
    @IsNumber({}, { message: 'A duração deve ser um número.' })
    @Min(20, { message: 'A duração deve ser no mínimo 20 minutos.' })
    @Max(60, { message: 'A duração deve ser no máximo 60 minutos.' })
    @IsOptional()
    duracao: number
}

/**
 * DTO para atualização de um material.
 */
export class UpdateMaterialDTO {
    @ApiProperty({
        description: 'ID do material.',
        example: 1,
        required: false,
    })
    @IsNumber({}, { message: 'O ID do material deve ser um número.' })
    @IsOptional()
    id?: number

    @ApiProperty({
        description: 'Título do material.',
        example: 'Introdução à Programação',
        required: false,
    })
    @IsString({ message: 'O nome do material deve ser uma string.' })
    @IsOptional()
    titulo?: string

    @ApiProperty({
        description: 'Descrição do material.',
        example: 'Este material aborda os conceitos básicos de programação.',
        required: false,
    })
    @IsString({ message: 'A descrição do material deve ser uma string.' })
    @IsOptional()
    descricao?: string

    @ApiProperty({
        description: 'ID do usuário associado ao material.',
        example: 1,
        required: false,
    })
    @IsNumber({}, { message: 'O ID do usuario inválido.' })
    @IsOptional()
    usuario_id?: number

    @ApiProperty({
        description: 'ID do nível associado ao material.',
        example: 2,
        required: false,
    })
    @IsNumber({}, { message: 'O ID do nivel inválido.' })
    @IsOptional()
    nivel_id?: number

    @ApiProperty({
        description: 'ID da categoria associada ao material.',
        example: 3,
        required: false,
    })
    @IsNumber({}, { message: 'O ID da categoria inválido.' })
    @IsOptional()
    categoria_id?: number

    @ApiProperty({
        description: 'Duração do material em minutos.',
        example: 45,
        required: false,
    })
    @IsNumber({}, { message: 'A duração deve ser um número.' })
    @IsOptional()
    duracao?: number
}

/**
 * DTO para representar um material.
 */
export class MaterialDto {
    @ApiProperty({
        description: 'ID do material.',
        example: 1,
    })
    id: number

    @ApiProperty({
        description: 'Título do material.',
        example: 'Introdução à Programação',
    })
    titulo: string

    @ApiProperty({
        description: 'Descrição do material.',
        example: 'Este material aborda os conceitos básicos de programação.',
    })
    descricao: string

    @ApiProperty({
        description: 'ID do usuário associado ao material.',
        example: 1,
    })
    usuario_id: number

    @ApiProperty({
        description: 'ID do nível associado ao material.',
        example: 2,
    })
    nivel_id: number

    @ApiProperty({
        description: 'ID da categoria associada ao material.',
        example: 3,
    })
    categoria_id: number

    @ApiProperty({
        description: 'Duração do material em minutos.',
        example: 45,
    })
    duracao: number

    @ApiProperty({
        description: 'Data de criação do material.',
        example: '2025-04-13T12:00:00Z',
    })
    criado_em: Date

    @ApiProperty({
        description: 'Data de atualização do material.',
        example: '2025-04-14T12:00:00Z',
    })
    atualizado_em: Date

    @ApiProperty({
        description: 'Indica se o material foi aprovado.',
        example: true,
    })
    aprovado: boolean

    @ApiProperty({
        description: 'Indica se o material é um destaque.',
        example: false,
    })
    destaque: boolean

    @ApiProperty({
        description: 'Indica se o material é recomendado.',
        example: true,
    })
    recomendado: boolean
}
