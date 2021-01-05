import { Injectable } from '@nestjs/common';
import { User } from '../intities/user.entity';
import { Connection, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private connection: Connection,
  ) {}

  isValidEmail(email: string): boolean {
    const isAnValidEmail = this.userRepo.findOne({ where: email });
    console.log('Fetched user: ', isAnValidEmail);
    return !isAnValidEmail;
  }
}
