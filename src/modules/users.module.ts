import { Module } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../providers/user.service';
import { UserController } from '../controllers/userController';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export default class UsersHttpModule {}
