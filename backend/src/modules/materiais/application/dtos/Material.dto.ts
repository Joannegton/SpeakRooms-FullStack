import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

export class CreateMaterialDTO {
    @IsString({ message: 'O nome do material deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome do material é obrigatório.' })
    titulo: string

    @IsString({ message: 'A descrição do material deve ser uma string.' })
    @IsOptional()
    descricao?: string

    @IsNumber({}, { message: 'O ID do usuario inválido.' })
    @IsNotEmpty({ message: 'O ID do usuario é obrigatório.' })
    usuario_id: number

    @IsNumber({}, { message: 'O ID do nivel inválido.' })
    @IsNotEmpty({ message: 'O ID do nivel é obrigatório.' })
    nivel_id: number

    @IsNumber({}, { message: 'O ID da categoria inválido.' })
    @IsNotEmpty({ message: 'O ID da categoria é obrigatório.' })
    categoria_id: number

    @IsNumber({}, { message: 'A duração deve ser um número.' })
    @IsOptional()
    duracao: number
}

export class UpdateMaterialDTO {
    @IsNumber({}, { message: 'O ID do material deve ser um número.' })
    @IsOptional()
    id?: number

    @IsString({ message: 'O nome do material deve ser uma string.' })
    @IsOptional()
    titulo?: string

    @IsString({ message: 'A descrição do material deve ser uma string.' })
    @IsOptional()
    descricao?: string

    @IsNumber({}, { message: 'O ID do usuario inválido.' })
    @IsOptional()
    usuario_id?: number

    @IsNumber({}, { message: 'O ID do nivel inválido.' })
    @IsOptional()
    nivel_id?: number

    @IsNumber({}, { message: 'O ID da categoria inválido.' })
    @IsOptional()
    categoria_id?: number

    @IsNumber({}, { message: 'A duração deve ser um número.' })
    @IsOptional()
    duracao?: number
}

export class MaterialDto {
    id: number
    titulo: string
    descricao: string
    usuario_id: number
    nivel_id: number
    categoria_id: number
    duracao: number
    criado_em: Date
    atualizado_em: Date
    aprovado: boolean
    destaque: boolean
    recomendado: boolean
}
