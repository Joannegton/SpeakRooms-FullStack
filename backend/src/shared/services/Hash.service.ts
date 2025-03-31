import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { ServicoExcecao } from 'src/utils/exception'
import { ResultadoAssincrono, ResultadoUtil } from 'src/utils/result'

@Injectable()
export class HashService {
    private readonly saltRounds = 10

    async hashPassword(
        password: string,
    ): ResultadoAssincrono<ServicoExcecao, string> {
        const result = await bcrypt.hash(password, this.saltRounds)
        if (!result) {
            return ResultadoUtil.falha(
                new ServicoExcecao('Erro ao gerar o hash da senha.'),
            )
        }
        return ResultadoUtil.sucesso(result)
    }

    async comparePassword(
        password: string,
        hash: string,
    ): ResultadoAssincrono<ServicoExcecao, boolean> {
        const result = await bcrypt.compare(password, hash)
        if (!result) {
            return ResultadoUtil.falha(
                new ServicoExcecao('Erro ao comparar a senha.'),
            )
        }
        return ResultadoUtil.sucesso(result)
    }
}
