import { TypeOrmModule } from '@nestjs/typeorm'
import { UsuarioController } from './../usuario.controller'
import { Module } from '@nestjs/common'
import { OrmConfig } from 'ormConfig'

@Module({
    imports: [TypeOrmModule.forRoot({ ...OrmConfig })],
    controllers: [UsuarioController],
    providers: [],
})
export class UsuarioModule {}
