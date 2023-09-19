import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AccessTokenResponse } from './access-token-response';
import { User } from 'src/users/entities/user.entity';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto): Promise<AccessTokenResponse> {
    const user = await this.usersService.findByCredentials(
      credentialsDto.email,
      credentialsDto.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: await this.jwtService.signAsync({
        sub: user._id,
        email: user.email,
      }),
    };
  }

  async register(dto: CredentialsDto): Promise<User> {
    const user = await this.usersService.create(dto);
    return {
      ...user,
      password: undefined,
    };
  }
}
