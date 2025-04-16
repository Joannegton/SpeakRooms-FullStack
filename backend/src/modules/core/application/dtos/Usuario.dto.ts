import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsString,
    IsDate,
} from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CriarUsuarioDto {
    @ApiProperty({ description: 'Nome de usuário', example: 'johndoe' })
    @IsString({ message: 'O nome de usuário deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
    nomeUsuario: string

    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'johndoe@example.com',
    })
    @IsEmail({}, { message: 'O e-mail deve ser válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string

    @ApiProperty({ description: 'Senha do usuário', example: 'senha123' })
    @IsString({ message: 'Formato inválido' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    senha: string

    @ApiProperty({ description: 'Primeiro nome do usuário', example: 'John' })
    @IsString({ message: 'Formato inválido.' })
    @IsNotEmpty({ message: 'O primeiro nome é obrigatório.' })
    primeiroNome: string

    @ApiProperty({ description: 'Sobrenome do usuário', example: 'Doe' })
    @IsString({ message: 'Formato inválido' })
    @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
    sobrenome: string

    @ApiProperty({ description: 'ID do nível de inglês', example: 2 })
    @IsNumber({}, { message: 'O nível de inglês deve ser um número válido.' })
    nivelInglesId: number

    @ApiProperty({
        description: 'IDs dos interesses do usuário',
        example: [1, 2, 3],
    })
    @IsNotEmpty({ message: 'Os interesses são obrigatórios.' })
    @IsNumber({}, { each: true, message: 'Os interesses devem ser números.' })
    interessesId: number[]

    @ApiProperty({
        description: 'URL do avatar do usuário',
        example: 'http://example.com/avatar.jpg',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'A URL do avatar deve ser uma string.' })
    urlAvatar?: string
}

export class AtualizarUsuarioDto {
    @ApiProperty({
        description: 'Primeiro nome do usuário',
        example: 'John',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Formato inválido.' })
    primeiroNome?: string

    @ApiProperty({
        description: 'Sobrenome do usuário',
        example: 'Doe',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'Formato inválido' })
    sobrenome?: string

    @ApiProperty({
        description: 'ID do nível de inglês',
        example: 2,
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'O nível de inglês deve ser um número válido.' })
    nivelInglesId?: number

    @ApiProperty({
        description: 'IDs dos interesses do usuário',
        example: [1, 2, 3],
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { each: true, message: 'Os interesses devem ser números.' })
    interessesId?: number[]

    @ApiProperty({
        description: 'URL do avatar do usuário',
        example: 'http://example.com/avatar.jpg',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'A URL do avatar deve ser uma string.' })
    urlAvatar?: string

    @ApiProperty({
        description: 'Ativo',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'O campo ativo deve ser um valor booleano.' })
    ativo?: boolean
}

export class UsuarioDto {
    @ApiProperty({ description: 'ID do usuário', example: 1 })
    @IsNumber({}, { message: 'O ID inválido.' })
    usuario_id: number

    @ApiProperty({ description: 'Nome de usuário', example: 'johndoe' })
    @IsString({ message: 'O nome de usuário deve ser uma string.' })
    nomeUsuario: string

    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'johndoe@example.com',
    })
    @IsEmail({}, { message: 'O e-mail deve ser válido.' })
    email: string

    @ApiProperty({ description: 'Primeiro nome do usuário', example: 'John' })
    @IsString({ message: 'Formato inválido.' })
    primeiroNome: string

    @ApiProperty({ description: 'Sobrenome do usuário', example: 'Doe' })
    @IsString({ message: 'Formato inválido' })
    sobrenome: string

    @ApiProperty({ description: 'ID do nível de inglês', example: 2 })
    @IsNumber({}, { message: 'O nível de inglês deve ser um número válido.' })
    nivelInglesId: number

    @ApiProperty({
        description: 'IDs dos interesses do usuário',
        example: [1, 2, 3],
    })
    @IsNumber({}, { each: true, message: 'Os interesses devem ser números.' })
    interessesId: number[]

    @ApiProperty({
        description: 'URL do avatar do usuário',
        example: 'http://example.com/avatar.jpg',
        required: false,
    })
    @IsOptional()
    @IsString({ message: 'A URL do avatar deve ser uma string.' })
    urlAvatar?: string

    @ApiProperty({
        description: 'Pontos',
        example: '5',
        required: false,
    })
    @IsOptional()
    @IsNumber({}, { message: 'Os pontos devem ser um número válido.' })
    pontos?: number

    @ApiProperty({
        description: 'Ativo',
        example: true,
        required: false,
    })
    @IsOptional()
    @IsBoolean({ message: 'O campo ativo deve ser um valor booleano.' })
    ativo?: boolean

    @ApiProperty({
        description: 'Data de criação',
        example: '2023-01-01T00:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsDate({ message: 'A data de criação deve ser uma data válida.' })
    created_at?: Date

    @ApiProperty({
        description: 'Data de atualização',
        example: '2023-01-01T00:00:00Z',
        required: false,
    })
    @IsOptional()
    @IsDate({ message: 'A data de atualização deve ser uma data válida.' })
    updated_at?: Date
}
