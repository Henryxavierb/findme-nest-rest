import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './intities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
  ) {}
}

export default RepoService;
