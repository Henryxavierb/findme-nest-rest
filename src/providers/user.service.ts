import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { UserSchema } from '../interfaces';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  isEmpty(field: string, message: string): void {
    if (!field) throw new Error(message);
  }

  validateEmptyFields(userData: UserSchema) {
    this.isEmpty(userData.name, 'Nome não pode ser nulo');
    this.isEmpty(userData.email, 'Email não pode ser nulo');
    this.isEmpty(userData.password, 'Senha não pode ser nula');
  }

  validatePassword(password: string) {
    if (password.length < 8)
      throw new Error('A senha deve conter no mínimo 8 caracteres');
  }

  async validateEmail(email: string) {
    const emailAlreadyUsed = await this.userRepo.findOne({ where: { email } });
    if (emailAlreadyUsed) throw new Error('O email atual já está em uso');
  }

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  createUser(userData: UserSchema): Promise<User> {
    const password = this.encryptPassword(userData.password);
    const userId = crypto.randomBytes(5).toString('hex');
    const user = this.userRepo.create({ ...userData, password, id: userId });

    return this.userRepo.save(user);
  }

  generateToken(params: Record<string, string>): string {
    return jwt.sign(params, process.env.JWT_KEY || '');
  }

  findAll(): Promise<User[]> {
    return this.userRepo.find();
  }
}
