import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  signIn(user: any) {
    const payload = { _id: user._id, name: user.name };
    return this.jwtService.sign(payload);
  }
}
