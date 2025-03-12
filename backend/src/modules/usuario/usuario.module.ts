import { UsuarioController } from './../usuario.controller'
import { Module } from '@nestjs/common'

@Module({
    imports: [],
    controllers: [UsuarioController],
    providers: [],
})
export class UsuarioModule {}
