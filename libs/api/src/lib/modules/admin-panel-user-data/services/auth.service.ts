import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminPanelUser } from '../entities/admin-panel-user.entity';
import { JwtPayload } from '../models/jwt.model';
import { LoginData, LoginResponse, RegistrationData } from '@sue-bot-platform/types';
import { AdminPanelUserService } from './admin-panel-user.service';
import { isNil } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminPanelUserService: AdminPanelUserService
  ) {}

  async login(data: LoginData): Promise<LoginResponse> {
    const user: AdminPanelUser = await this.adminPanelUserService.findOne(data.email);
    if (isNil(user)) {
      throw new BadRequestException('Invalid credentials');
    }
    const payload: JwtPayload = { email: user.email, sub: user.id };
    await this.adminPanelUserService.setLoginTime(data.email);
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      role: user.role,
    };
  }

  async register(data: RegistrationData): Promise<AdminPanelUser> {
    const existingUser: AdminPanelUser = await this.adminPanelUserService.findOne(data.email);
    if (!isNil(existingUser)) {
      throw new BadRequestException('User already exists');
    }
    return this.adminPanelUserService.create(data);
  }
}
