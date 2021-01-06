import { Module } from '@nestjs/common';
import { ORMOptions } from '../ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from './modules/users.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(ORMOptions)],
})
export class AppModule {}
