import TestUser from '../utils/test/test.user';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../providers/user.service';

describe('UserController', () => {
  let userService: UserService;

  const mockRepository = {
    find: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          useValue: mockRepository,
          provide: getRepositoryToken(User),
        },
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should be returned all users', async () => {
      const user = TestUser.giveValidUser();
      mockRepository.find.mockReturnValue([user, user]);

      const users = await userService.findAll();

      expect(users).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should be validate user password', async () => {
      const user = TestUser.giveValidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);

      const newUser = await userService.createUser(user);

      expect(newUser.password).not.toBeNull();
      expect(newUser.password.length).toBeGreaterThanOrEqual(8);
    });

    it('should be validate user email', async () => {
      const user = TestUser.giveValidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);

      const newUser = await userService.createUser(user);

      expect(newUser.password).not.toBeNull();
    });

    it('should be created a new user', async () => {
      const user = TestUser.giveValidUser();
      mockRepository.save.mockReturnValue(user);
      mockRepository.create.mockReturnValue(user);

      const newUser = await userService.createUser(user);

      expect(newUser).toMatchObject({
        id: '123456',
        name: 'example name',
        password: '12345678',
        email: 'example@gmail.com',
      });
    });
  });
});
