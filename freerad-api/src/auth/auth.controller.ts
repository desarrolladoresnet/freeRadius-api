import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SingUserDto, UserDto } from 'src/dto/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  // @HttpCode(HttpStatus.OK)
  // @Post('login')
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.username, signInDto.password);
  // }

  @Post('singup')
  signup(@Body() data: UserDto) {
    return this.userService.CreateUSer(data);
  }

  @Post('singin')
  async singin(@Body() data: SingUserDto) {
    const user = await this.userService.singIn(data);
    if (!user) return user;
    return this.authService.singToken(
      user.id,
      user.rol,
      user.email,
      user.username,
    );
  }

  @Get('isusername/:username')
  async isUsername(@Param() username: string) {
    return this.userService.IsUsername(username);
  }

  // @UseGuards(AuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
