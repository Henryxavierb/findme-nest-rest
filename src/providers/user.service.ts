import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { NewUserSchema } from '../interfaces';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async validateEmail(email: string) {
    const emailAlreadyUsed = await this.userRepo.findOne({ where: { email } });
    if (emailAlreadyUsed) throw new Error('O email atual já está em uso');
  }

  encryptPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  createUser(userData: NewUserSchema): Promise<User> {
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
