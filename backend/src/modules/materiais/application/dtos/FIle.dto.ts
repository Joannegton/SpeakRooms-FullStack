import { AxiosResponse } from 'axios'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

/**
 * DTO para upload de arquivo.
 */
export class UploadFileDTO {
    @ApiProperty({
        description: 'ID do material associado ao arquivo.',
        example: 123,
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    material_id: number

    @ApiProperty({
        description: 'ID do usuário associado ao arquivo.',
        example: 456,
    })
    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    usuario_id: number

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => Number(value))
    tamanho_arquivo: number

    @IsOptional()
    @IsString()
    url: string

    @IsOptional()
    @IsString()
    tipo_arquivo: string

    @IsOptional()
    @IsString()
    cloudinary_id: string
}

/**
 * DTO para atualização de arquivo.
 */
export class UpdateFileDTO {
    /**
     * ID do arquivo no Cloudinary.
     */
    @IsOptional()
    @IsString()
    cloudinary_id?: string

    /**
     * Tamanho do arquivo em bytes.
     */
    @IsOptional()
    @IsNumber()
    tamanho_arquivo?: number

    /**
     * URL do arquivo.
     */
    @IsOptional()
    @IsString()
    url?: string

    /**
     * Tipo do arquivo (ex.: PDF, PNG).
     */
    @IsOptional()
    @IsString()
    tipo_arquivo?: string
}

/**
 * DTO para representar um arquivo.
 */
export class FileDto {
    /**
     * ID do arquivo no Cloudinary.
     */
    cloudinary_id: string

    /**
     * URL do arquivo.
     */
    url: string

    /**
     * Tipo do arquivo (ex.: PDF, PNG).
     */
    tipo_arquivo: string

    /**
     * Tamanho do arquivo em bytes.
     */
    tamanho_arquivo: number

    /**
     * Conteúdo do arquivo.
     */
    arquivo: AxiosResponse
}
