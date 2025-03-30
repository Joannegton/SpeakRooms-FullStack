/* eslint-disable @typescript-eslint/no-explicit-any */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'

dotenv.config()

export const OrmConfig: TypeOrmModuleOptions = {
    name: 'postgres',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    dropSchema: true,
    migrationsRun: true,
    logging: true,
    entities: ['dist/src/modules/**/infra/models/*.model{.ts,.js}'],
    migrations: ['dist/src/shared/infra/migrations/**/*.ts'],
}

export const OrmConfigDataSource = new DataSource(OrmConfig as any)
