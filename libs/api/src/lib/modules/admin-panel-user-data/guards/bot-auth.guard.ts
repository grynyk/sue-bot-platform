import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GLOBAL_VARIABLES } from '@sue-bot-platform/core';
import { isNil } from 'lodash';
import { Observable } from 'rxjs';

@Injectable()
export class BotAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string = request.headers['x-telegram-bot-token'];
    if (isNil(token)) {
      throw new UnauthorizedException('Bot token missing');
    }
    const validToken: string = this.configService.getOrThrow<string>(GLOBAL_VARIABLES.BOT_TOKEN);
    if (token !== validToken) {
      throw new UnauthorizedException('Invalid bot token');
    }
    return true;
  }
}
