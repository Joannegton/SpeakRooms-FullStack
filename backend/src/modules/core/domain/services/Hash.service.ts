export interface HashService {
    hashPassword(password: string): Promise<string>

    comparePassword(password: string, hash: string): Promise<boolean>

    encryptString(data: string): string

    decryptString(encryptedData: string): string
}
