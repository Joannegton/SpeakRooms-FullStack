import { PropriedadesInvalidasExcecao } from 'src/utils/exception'
import { RecuperarSenha } from '../../domain/models/RecuperarSenha.model'
import { Resultado, ResultadoUtil } from 'src/utils/result'

export class RecuperarSenhaMapperApplication {
    toDomain(
        usuarioId: number,
    ): Resultado<PropriedadesInvalidasExcecao, RecuperarSenha> {
        const domainResult = RecuperarSenha.criar(usuarioId)

        if (domainResult.ehFalha()) {
            return ResultadoUtil.falha(domainResult.erro)
        }

        return ResultadoUtil.sucesso(domainResult.valor)
    }
}
