import { User } from '@prisma/client';

export class CreateUserResponse {
  readonly id: number;
  readonly name: string;
  readonly email: string;

  constructor(data: User) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
  }

  static fromUser(data: User): CreateUserResponse {
    return new CreateUserResponse(data);
  }

  static fromUserList(users: User[]): CreateUserResponse[] {
    return users.map((user) => CreateUserResponse.fromUser(user));
  }
}
