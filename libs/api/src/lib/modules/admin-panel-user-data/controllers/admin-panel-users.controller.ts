import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { AdminPanelUser } from '../entities';
import { AdminPanelUserService } from '../services';

@Controller('admin')
export class AdminPanelUsersController {
  constructor(private readonly adminPanelUserService: AdminPanelUserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getAll(): Promise<AdminPanelUser[]> {
    return this.adminPanelUserService.findAll();
  }
}
