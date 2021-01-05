import * as envModule from 'dotenv';
import { Connection } from 'typeorm';
import RepoModule from './repo.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/userController';

envModule.config();

@Module({
  imports: [
    RepoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    }),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
