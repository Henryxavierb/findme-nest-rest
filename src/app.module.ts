import { Module } from '@nestjs/common';
import { UserController } from './controllers/userController';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
