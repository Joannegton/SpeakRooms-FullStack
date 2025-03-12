import { UsuarioModule } from './modules/usuario/usuario.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
    imports: [UsuarioModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
