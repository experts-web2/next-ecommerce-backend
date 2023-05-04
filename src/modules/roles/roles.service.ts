import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from '../roles/roles.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findOne(id: string): Promise<Role> {
    return this.roleModel.findById(id).exec();
  }

  async create(role: Role): Promise<Role> {
    const createdRole = new this.roleModel(role);
    return createdRole.save();
  }

  async update(id: string, role: Role): Promise<Role> {
    return this.roleModel.findByIdAndUpdate(id, role, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.roleModel.findByIdAndDelete(id).exec();
  }

  async findRoleByName(name: string): Promise<any> {
    await this.roleModel.findOne({ name: name }).exec();
  }
}
