import { FileMapperApplication } from './application/mappers/File.mapper'
import { MaterialMapperApplication } from './application/mappers/Material.mapper'
import { Queries } from './application/queries'
import { UseCases } from './application/usecases'
import { FileMapper } from './infra/mappers/File.mapper'
import { MaterialMapper } from './infra/mappers/Material.mapper'
import { FileRepositoryImpl } from './infra/repositories/File.repository'
import { MaterialRepositoryImpl } from './infra/repositories/Material.repository'
import { CloudinaryService } from './infra/services/Cloudinary.service'
import { VirusTotalService } from './infra/services/VirusTotal.service'
import { MaterialController } from './materiais.controller'
import { Module } from '@nestjs/common'

@Module({
    imports: [],
    controllers: [MaterialController],
    providers: [
        ...UseCases,
        ...Queries,
        FileMapper,
        FileMapperApplication,
        MaterialMapper,
        MaterialMapperApplication,
        CloudinaryService,
        VirusTotalService,
        {
            provide: 'FileRepository',
            useClass: FileRepositoryImpl,
        },
        {
            provide: 'MaterialRepository',
            useClass: MaterialRepositoryImpl,
        },
    ],
})
export class MateriaisModule {}
