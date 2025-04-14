import { Module } from '@nestjs/common'

@Module({
    imports: [SharedModule],
    controllers: [],
    providers: [],
    exports: [SharedModule],
})
export class SharedModule {}
