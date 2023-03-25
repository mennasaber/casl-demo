import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Action, Subject } from './constants.utils';
// action, object
export type RequiredPermission = [Action, Subject];
export const PERMISSION_KEY = 'permission_key';
export const CheckPermissions = (
  ...params: RequiredPermission[]
): CustomDecorator<string> => SetMetadata(PERMISSION_KEY, params);
