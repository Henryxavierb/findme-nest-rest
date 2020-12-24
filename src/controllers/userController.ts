import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Controller, Post, Req, Res } from '@nestjs/common';

@Controller('session')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signIn')
  create(@Req() request: Request, @Res() response: Response): Response {
    const { name, email, password } = request.body;

    if (this.userService.isValidEmail(email))
      return response.json({ message: 'Email inválido!' });

    return response.json({ message: 'Usuário cadastrado com sucesso!' });
  }
}
