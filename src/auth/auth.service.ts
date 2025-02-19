import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

type AuthInput = { username: string; password: string };
type SignInData = { userId: string; username: string };
type AuthResult = { token: string; userId: string; username: string };

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(input: AuthInput): Promise<AuthResult | null> {
    const user = await this.validateUser(input);
    if (user) {
      return this.signIn({ userId: user.userId, username: user.username });
    }

    // not authenticated
    throw new UnauthorizedException();
  }

  async validateUser(input: AuthInput): Promise<SignInData | null> {
    const user = await this.userService.findUserByName(input.username);

    if (user && user.password === input.password) {
      return { userId: user.id, username: user.name };
    }
    return null;
  }

  async signIn(user: SignInData): Promise<AuthResult | null> {
    const tokenPayload = {
      sub: user.userId,
      username: user.username,
    };

    const token = this.jwtService.sign(tokenPayload);

    return { token, userId: user.userId, username: user.username };
  }
}
