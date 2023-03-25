import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Action, Subject } from 'src/utils/constants.utils';
import { Permission, PermissionDocument } from './entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: Model<PermissionDocument>,
  ) {}
  async fillData() {
    await this.permissionModel.create([
      { action: Action.Create, subject: Subject.Product },
      { action: Action.Create, subject: Subject.User },
      { action: Action.Create, subject: Subject.All },
      { action: Action.Update, subject: Subject.Product },
      { action: Action.Update, subject: Subject.User },
      { action: Action.Update, subject: Subject.All },
      { action: Action.Delete, subject: Subject.Product },
      { action: Action.Delete, subject: Subject.User },
      { action: Action.Delete, subject: Subject.All },
      { action: Action.Read, subject: Subject.Product },
      { action: Action.Read, subject: Subject.User },
      { action: Action.Read, subject: Subject.All },
    ]);
  }
  async findByQuery(query: any) {
    return this.permissionModel.find(query);
  }
}
