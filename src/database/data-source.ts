import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'alex210489',
  database: 'gobarber',
  migrations: ['src/database/migrations/*.ts'],
})
