import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services';
import { LocalAuthGuard } from '../guards';
import { LoginData, LoginResponse, RegistrationData } from '@sue-bot-platform/types';
import { AuthRequest } from '../models';
import { AdminPanelUser } from '../entities';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest<LoginData>): Promise<LoginResponse> {
    return this.authService.login(req.user);
  }

  @Post('request')
  async register(@Body() body: RegistrationData): Promise<AdminPanelUser> {
    return this.authService.register(body);
  }
}
