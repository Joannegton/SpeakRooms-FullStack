import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsString,
    IsDate,
} from 'class-validator'

export class UsuarioDto {
    @IsNumber({}, { message: 'O ID inválido.' })
    usuario_id: number

    @IsString({ message: 'O nome de usuário deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome de usuário é obrigatório.' })
    nomeUsuario: string

    @IsEmail({}, { message: 'O e-mail deve ser válido.' })
    @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
    email: string

    @IsString({ message: 'Formato inválido' })
    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    senha: string

    @IsString({ message: 'Formato inválido.' })
    @IsNotEmpty({ message: 'O primeiro nome é obrigatório.' })
    primeiroNome: string

    @IsString({ message: 'Formato inválido' })
    @IsNotEmpty({ message: 'O sobrenome é obrigatório.' })
    sobrenome: string

    @IsNumber({}, { message: 'O nível de inglês deve ser um número válido.' })
    nivelInglesId: number

    @IsOptional()
    @IsString({ message: 'A URL do avatar deve ser uma string.' })
    urlAvatar?: string

    @IsOptional()
    @IsNumber({}, { message: 'Os pontos devem ser um número válido.' })
    pontos?: number

    @IsOptional()
    @IsBoolean({ message: 'O campo ativo deve ser um valor booleano.' })
    ativo?: boolean

    @IsOptional()
    @IsDate({ message: 'A data de criação deve ser uma data válida.' })
    created_at?: Date

    @IsOptional()
    @IsDate({ message: 'A data de atualização deve ser uma data válida.' })
    updated_at?: Date
}
