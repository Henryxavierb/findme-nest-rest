import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  isValidEmail(email: string): boolean {
    const isAnValidEmail = true;
    return !isAnValidEmail;
  }
}
