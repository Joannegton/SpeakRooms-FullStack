import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    synchronize: false,
    logging: false,
    entities: ['**/infra/models/*.model.ts'],
    migrations: ['../shared/infra/migrations/*.ts'],
    subscribers: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!')
    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })
