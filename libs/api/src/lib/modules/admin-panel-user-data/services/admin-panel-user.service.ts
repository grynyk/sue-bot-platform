import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminPanelUser } from '../entities/admin-panel-user.entity';
import { isNil } from 'lodash';
import { CreateAdminPanelUserDto } from '../dto';

@Injectable()
export class AdminPanelUserService {
  constructor(@InjectRepository(AdminPanelUser) private readonly repository: Repository<AdminPanelUser>) {}

  async findAll(): Promise<AdminPanelUser[]> {
    return this.repository.find();
  }

  async findOne(email: string): Promise<AdminPanelUser | undefined> {
    return this.repository.findOne({ where: { email } });
  }

  async create(data: Partial<CreateAdminPanelUserDto>): Promise<AdminPanelUser> {
    const salt: string = await bcrypt.genSalt();
    const hashedPassword: string = await bcrypt.hash(data.password, salt);
    const user: AdminPanelUser = this.repository.create({ email: data.email, name: data.name, password: hashedPassword });
    return this.repository.save(user);
  }

  async setLoginTime(email: string): Promise<void> {
    const user: AdminPanelUser = await this.findOne(email);
    if (isNil(user)) {
      throw new NotFoundException(`User not found`);
    }
    user.lastLogin = new Date();
    this.repository.save(user);
  }

  async validate(email: string, password: string): Promise<AdminPanelUser | null> {
    const user: AdminPanelUser = await this.findOne(email);
    if (isNil(user)) {
      throw new NotFoundException('User not found');
    }
    const passwordMatches: boolean = await bcrypt.compare(password, user.password);
    if (user && passwordMatches) {
      return user;
    }
    return null;
  }
}
