import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'

@Injectable()
export class HashService {
    async hashPassword(password: string): Promise<string> {
        const salts = await bcrypt.genSalt()
        return await bcrypt.hash(password, salts)
    }

    async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash)
    }

    encryptString(data: string): string {
        const cipher = crypto.createCipheriv(
            process.env.CIPHER_ALGORITHM,
            process.env.CIPHER_KEY,
            process.env.CIPHER_IV,
        )
        const encrypted = cipher.update(data, 'utf8', 'hex')
        return encrypted + cipher.final('hex')
    }

    decryptString(encryptedData: string): string {
        const decipher = crypto.createDecipheriv(
            process.env.CIPHER_ALGORITHM,
            process.env.CIPHER_KEY,
            process.env.CIPHER_IV,
        )
        const decrypted = decipher.update(encryptedData, 'hex', 'utf8')
        return decrypted + decipher.final('utf8')
    }
}
