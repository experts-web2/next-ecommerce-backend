import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from '../roles/roles.schema';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get('name/:name')
  async findRoleByName(name: string): Promise<Role> {
    return this.rolesService.findRoleByName(name);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Post()
  async create(@Body() role: Role): Promise<Role> {
    return this.rolesService.create(role);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() role: Role): Promise<Role> {
    return this.rolesService.update(id, role);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.rolesService.delete(id);
  }
}
