import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async singToken(
    userid: number,
    rol: string,
    email: string,
    username: string,
  ) {
    const data = {
      subs: userid,
      rol,
      email,
    };

    const secret = this.configService.get('JWT');

    const access_token: string = this.jwtService.sign(data, {
      expiresIn: '9h',
      secret: secret,
    });

    return { access_token, userid, rol, username };
  }
}
