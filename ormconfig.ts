import * as envModule from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

envModule.config();

export const ORMOptions: TypeOrmModuleOptions = {
  logging: true,
  type: 'postgres',
  autoLoadEntities: true,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  entities: [__dirname + '../entities/*{.ts,.js}'],
  migrations: [__dirname + '../migrations/*{.ts,.js}'],
};
