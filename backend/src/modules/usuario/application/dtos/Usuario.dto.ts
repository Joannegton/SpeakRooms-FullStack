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
    @IsNumber()
    usuario_id: number

    @IsString()
    @IsNotEmpty()
    nomeUsuario: string

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    senha: string

    @IsString()
    @IsNotEmpty()
    primeiroNome: string

    @IsString()
    @IsNotEmpty()
    sobrenome: string

    @IsNumber()
    nivelInglesId: number

    @IsOptional()
    @IsString()
    urlAvatar?: string

    @IsOptional()
    @IsNumber()
    pontos?: number

    @IsOptional()
    @IsBoolean()
    ativo?: boolean

    @IsOptional()
    @IsDate()
    created_at?: Date

    @IsOptional()
    @IsDate()
    updated_at?: Date
}
