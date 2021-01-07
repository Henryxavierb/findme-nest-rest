import { Response } from 'express';
import { UserSchema } from '../interfaces';
import { UserService } from '../providers/user.service';
import { Controller, Post, Body, Res, Get } from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signUp')
  async create(@Body() User: UserSchema, @Res() response: Response) {
    try {
      this.userService.validateEmptyFields(User);
      await this.userService.validateEmail(User.email);
      await this.userService.validatePassword(User.password);
      const registeredUser = await this.userService.createUser(User);

      const accessToken = this.userService.generateToken({
        id: registeredUser.id,
      });

      return response.json({
        status: 'success',
        message: 'Usuário cadastrado com sucesso!',
        accessToken,
        data: registeredUser,
      });
    } catch (error) {
      return response.json({
        status: 'error',
        message: error.message,
      });
    }
  }

  @Get('/user/list')
  async index(@Res() response: Response) {
    const users = await this.userService.findAll();
    return response.json({ users: users });
  }
}
