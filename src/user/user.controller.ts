import { Controller, Get, UseGuards } from '@nestjs/common';
import { CheckPermissions } from 'src/utils/casl.decorator';
import { PermissionsGuard } from 'src/utils/casl.guard';
import { Action, Subject } from 'src/utils/constants.utils';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('Fill-Data')
  async fillData() {
    await this.userService.fillData();
  }
  @Get('Test')
  @UseGuards(PermissionsGuard)
  @CheckPermissions([Action.Create, Subject.User])
  createUser() {
    return;
  }
}
