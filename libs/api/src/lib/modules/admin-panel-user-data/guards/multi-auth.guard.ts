import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BotAuthGuard } from './bot-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class MultiAuthGuard implements CanActivate {
  constructor(
    private readonly jwtAuthGuard: JwtAuthGuard,
    private readonly botAuthGuard: BotAuthGuard
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await this.jwtAuthGuard.canActivate(context)) {
      return true;
    }
    if (await this.botAuthGuard.canActivate(context)) {
      return true;
    }
    return false;
  }
}
