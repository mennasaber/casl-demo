import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleService } from 'src/role/role.service';
import { RoleName } from 'src/utils/constants.utils';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private roleService: RoleService,
  ) {}
  getUserPermissions(userId: string) {
    return this.userModel
      .findById(userId)
      .populate({ path: 'role', populate: { path: 'permissions' } });
  }
  async fillData() {
    const adminRole = await this.roleService.findOneByQuery({
      name: RoleName.Admin,
      removed: false,
    });
    const superAdminRole = await this.roleService.findOneByQuery({
      name: RoleName.SuperAdmin,
      removed: false,
    });
    const userRole = await this.roleService.findOneByQuery({
      name: RoleName.User,
      removed: false,
    });
    await this.userModel.create([
      {
        name: 'Super Admin',
        role: superAdminRole._id,
      },
      {
        name: 'Admin',
        role: adminRole._id,
      },
      { name: 'User', role: userRole._id },
    ]);
  }
}
