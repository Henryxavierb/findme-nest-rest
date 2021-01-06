import { User } from '../../entities/user.entity';

export default class TestUser {
  static giveValidUser(): User {
    const user = new User();

    user.id = '123456';
    user.name = 'example name';
    user.password = '12345678';
    user.email = 'example@gmail.com';

    return user;
  }
}
