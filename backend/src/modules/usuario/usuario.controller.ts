import { Body, Controller, Post } from '@nestjs/common'
import { SalvarUsuarioUseCase } from './application/useCases/SalvarUsuario.usecase'
import { UsuarioDto } from './application/dtos/Usuario.dto'

@Controller('usuario')
export class UsuarioController {
    constructor(private readonly salvarUsuarioUseCase: SalvarUsuarioUseCase) {}

    @Post('/cadastro')
    async salvarUsuario(@Body() params: UsuarioDto) {
        return await this.salvarUsuarioUseCase.execute(params)
        //entender a resposta do outro projeto e implementar ja com as modificações para portugues
    }
}
