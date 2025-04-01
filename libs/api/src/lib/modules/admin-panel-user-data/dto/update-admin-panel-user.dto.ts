import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminPanelUserDto } from './create-admin-panel-user.dto';

export class UpdateAdminPanelUserDto extends PartialType(CreateAdminPanelUserDto) {}
