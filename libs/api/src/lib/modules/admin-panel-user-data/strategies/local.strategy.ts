import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminPanelUserService } from '../services';
import { AdminPanelUser } from '../entities/admin-panel-user.entity';
import { isNil } from 'lodash';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly adminPanelUserService: AdminPanelUserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<AdminPanelUser> {
    const user: AdminPanelUser = await this.adminPanelUserService.validate(email, password);
    if (isNil(user)) {
      throw new UnauthorizedException('Invalid credentials [LocalStrategy]');
    }
    return user;
  }
}
