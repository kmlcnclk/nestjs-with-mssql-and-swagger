import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private userRepository: UserRepository) {}

  async getUsers(): Promise<User[]> {
    this.logger.log('Getting all users');

    return this.userRepository.findAll();
  }

  async createUser(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    this.logger.log('Creating new user');

    return this.userRepository.create({ email, name, password });
  }
}
