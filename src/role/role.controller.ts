import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Get('Fill-Data')
  async fillData() {
    await this.roleService.fillData();
  }
}
