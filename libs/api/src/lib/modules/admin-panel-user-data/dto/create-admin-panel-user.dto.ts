import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { ADMIN_PANEL_USER_ROLE, ADMIN_PANEL_USER_STATUS } from '@sue-bot-platform/types';

export class CreateAdminPanelUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEnum(ADMIN_PANEL_USER_ROLE)
  @IsOptional()
  role?: ADMIN_PANEL_USER_ROLE = ADMIN_PANEL_USER_ROLE.GUEST;

  @IsEnum(ADMIN_PANEL_USER_STATUS)
  @IsOptional()
  status?: ADMIN_PANEL_USER_STATUS = ADMIN_PANEL_USER_STATUS.INACTIVE;
}
