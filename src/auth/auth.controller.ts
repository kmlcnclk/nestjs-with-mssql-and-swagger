import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login with a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully logged in.',
  })
  async login(@Body() loginDto: LoginDto) {
    const { accessToken, refreshToken } =
      await this.authService.generateTokens(loginDto);

    return {
      accessToken,
      refreshToken,
    };
  }
}
