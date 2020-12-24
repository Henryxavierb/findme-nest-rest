import env from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './services/user.service';
import { UserController } from './controllers/userController';

env.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      port: 3306,
      entities: [],
      type: 'postgres',
      synchronize: true,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
