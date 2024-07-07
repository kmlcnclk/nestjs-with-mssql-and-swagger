import { Controller, Get, Post, Body, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dtos/createUser.dto';
import { ZodPipe } from 'src/pipes/zod.pipe';
import { createUserSchema } from './zodSchemas/create-user.zod';
import { CreateUserResponse } from './responses/create-user.response';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private logger = new Logger(UserController.name);

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  async getUsers() {
    this.logger.log('Getting all users');
    const users = await this.userService.getUsers();
    this.logger.log(`All users returned: ${users.length}`);
    return CreateUserResponse.fromUserList(users);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  async createUser(
    @Body(new ZodPipe(createUserSchema)) createUserDto: CreateUserDto,
  ) {
    this.logger.log(`Creating User: ${createUserDto.email}`);
    const user = await this.userService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.name,
    );
    this.logger.log(`User created: ${user?.id}`);
    return CreateUserResponse.fromUser(user);
  }
}
