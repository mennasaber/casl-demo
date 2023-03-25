import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get('Fill-Data')
  async fillData() {
    await this.permissionService.fillData();
  }
}
