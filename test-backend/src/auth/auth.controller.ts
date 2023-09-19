import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { AccessTokenResponse } from './access-token-response';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('tokens')
  createAccessToken(
    @Body() credentialsDto: CredentialsDto,
  ): Promise<AccessTokenResponse> {
    return this.authService.signIn(credentialsDto);
  }

  @Post('register')
  register(@Body() credentialsDto: CredentialsDto): Promise<User> {
    return this.authService.register(credentialsDto);
  }
}
