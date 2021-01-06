import { Response } from 'express';
import { UserModel } from '../interfaces';
import { UserService } from '../providers/user.service';
import { Controller, Post, Body, Res, Get } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  async create(@Body() User: UserModel, @Res() response: Response) {
    try {
      await this.userService.validateEmail(User.email);
      this.userService.validatePassword(User.password);
      const registeredUser = await this.userService.createUser(User);

      return response.json({
        status: 'success',
        message: 'Usuário cadastrado com sucesso!',
        ...registeredUser,
      });
    } catch (error) {
      return response.json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
