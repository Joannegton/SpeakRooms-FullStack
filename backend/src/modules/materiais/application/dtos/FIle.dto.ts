import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'

export class UploadFileDTO {
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    material_id: number

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    usuario_id: number

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    tamanho_arquivo: number

    @IsString()
    @IsOptional()
    url: string

    @IsString()
    @IsOptional()
    tipo_arquivo: string

    @IsString()
    @IsOptional()
    cloudinary_id: string
}

export class UpdateFileDTO {
    @IsOptional()
    @IsString()
    cloudinary_id?: string

    @IsOptional()
    @IsNumber()
    tamanho_arquivo?: number

    @IsOptional()
    @IsString()
    url?: string

    @IsOptional()
    @IsString()
    tipo_arquivo?: string
}

export class FileDto {
    id: number
    cloudinary_id: string
    url: string
    tipo_arquivo: string
    tamanho_arquivo: number
    enviado_em: Date
    usuario_id: number
}
