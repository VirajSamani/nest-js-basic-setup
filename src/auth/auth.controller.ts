import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() input: { username: string; password: string }) {
    const authResult = this.authService.authenticate(input);
    if (authResult) {
      return authResult;
    }
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getUserInfo(@Request() req) {
    return req.user;
  }
}
