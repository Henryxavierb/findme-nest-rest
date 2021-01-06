import crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserModel } from '../interfaces';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateEmail(email: string) {
    const emailAlreadyUsed = await this.userRepo.findOne({ where: { email } });
    if (emailAlreadyUsed) throw new Error('O email atual já está em uso');
  }

  validatePassword(password: string) {
    const MIN_ALLOWED_PASSWORD_LENGTH = 8;

    if (password.length < MIN_ALLOWED_PASSWORD_LENGTH)
      throw new Error('A senha deve possuir no mínimo 8 caracteres');
  }

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  createUser(userData: UserModel) {
    const password = this.encryptPassword(userData.password);
    const userId = crypto.randomBytes(5).toString('hex');
    const user = this.userRepo.create({ ...userData, password, id: userId });

    const saveUserInstance = this.userRepo.save(user);
    const accessToken = this.generateToken({ id: userData.id });

    return { accessToken, data: saveUserInstance };
  }

  generateToken(params: Record<string, string>): string {
    return jwt.sign(params, process.env.SECRET_TO_ACCESS_TOKEN);
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
