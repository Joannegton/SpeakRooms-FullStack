import { SharedModule } from './shared/shared.module'
import { CoreModule } from './modules/core/core.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { MateriaisModule } from './modules/materiais/materiais.module'

@Module({
    imports: [SharedModule, CoreModule, MateriaisModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
