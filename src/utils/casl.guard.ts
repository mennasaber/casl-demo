import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../user/casl.service';
import { PERMISSION_KEY, RequiredPermission } from './casl.decorator';
@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_KEY,
        context.getHandler(),
      ) || [];
    // ************ Temp solution you can replace it with JWT strategy ************
    const req = context.switchToHttp().getRequest();
    const user = req.headers['user'];
    const ability = await this.abilityFactory.createForUser(user);
    return requiredPermissions.every((permission) => {
      return ability.can(...permission);
    });
  }
}
