import RepoService from './repo.service';
import { User } from './intities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [RepoService],
  providers: [RepoService],
})
export default class RepoModule {}
