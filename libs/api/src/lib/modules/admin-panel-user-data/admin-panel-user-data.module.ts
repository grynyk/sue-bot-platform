import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminPanelUser } from './entities';
import { AuthController } from './controllers';
import { AdminPanelUserService, AuthService } from './services';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard, BotAuthGuard, MultiAuthGuard } from './guards';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from './strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GLOBAL_VARIABLES } from '@sue-bot-platform/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminPanelUser]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(GLOBAL_VARIABLES.JWT_SECRET),
        signOptions: { expiresIn: configService.get<string>(GLOBAL_VARIABLES.JWT_EXPIRATION) },
      }),
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AdminPanelUserService,
    JwtStrategy,
    LocalStrategy,
    AuthService,
    BotAuthGuard,
    JwtAuthGuard,
    MultiAuthGuard
  ],
  exports: [AuthService, BotAuthGuard, JwtAuthGuard, MultiAuthGuard],
})
export class AdminPanelUserDataModule {}
