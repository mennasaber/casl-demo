import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionService } from 'src/permission/permission.service';
import { Action, RoleName, Subject } from 'src/utils/constants.utils';
import { Role, RoleDocument } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private roleModel: Model<RoleDocument>,
    private permissionService: PermissionService,
  ) {}
  async fillData() {
    const suberAdminPermissions = await this.permissionService.findByQuery({
      subject: Subject.All,
      removed: false,
    });
    const adminPermissions = await this.permissionService.findByQuery({
      action: { $in: [Action.Create, Action.Update] },
      removed: false,
    });
    const userPermissions = await this.permissionService.findByQuery({
      action: { $in: [Action.Read] },
      removed: false,
    });
    await this.roleModel.create([
      {
        name: RoleName.SuperAdmin,
        permissions: suberAdminPermissions.map((p) => p._id),
      },
      {
        name: RoleName.Admin,
        permissions: adminPermissions,
      },
      { name: RoleName.User, permissions: userPermissions },
    ]);
  }
  async findOneByQuery(query: any) {
    return this.roleModel.findOne(query);
  }
}
