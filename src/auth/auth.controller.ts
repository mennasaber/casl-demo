import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('signIn/:id')
  signIn(@Param('id') id: string) {
    return this.authService.signIn({
      _id: id,
    });
  }
}
