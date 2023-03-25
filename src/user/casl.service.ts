import { createMongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CaslAbilityFactory {
  constructor(private userService: UserService) {}
  async createForUser(userId: string) {
    let caslPermissions = [];
    const userWithPermissions: any = await this.userService.getUserPermissions(
      userId,
    );
    if (
      userWithPermissions &&
      userWithPermissions.role &&
      userWithPermissions.role.permissions.length > 0
    ) {
      caslPermissions = userWithPermissions.role.permissions.map((p) => ({
        action: p.action,
        subject: p.subject,
      }));
    }
    return createMongoAbility(caslPermissions);
  }
}
