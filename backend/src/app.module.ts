import { CoreModule } from './modules/core/core.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MateriaisModule } from './modules/materiais/materiais.module'
import { SharedModule } from './modules/shared/shared.module'
import { SessaoAprendizadoModule } from './modules/sessoesAprendizado/SessaoAprendizado.module'

@Module({
    imports: [
        CoreModule,
        MateriaisModule,
        SharedModule,
        SessaoAprendizadoModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
