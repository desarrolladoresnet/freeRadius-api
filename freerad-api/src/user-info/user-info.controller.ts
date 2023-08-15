import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserDto } from 'src/dto/user.dto';
import { UserUpdateDto } from 'src/dto/userUpdate.dto';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  @Post()
  createUser(@Body() data: UserDto) {
    return this.userInfoService.CreateUser(data);
  }

  @Get()
  findAllUser() {
    return this.userInfoService.FindAllUsers();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userInfoService.FindById(id);
  }

  @Put(':id')
  updateUserInfo(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.userInfoService.UpdateUserInfo(id, data);
  }

  @Delete(':username')
  deleteByUsername(@Param('username') username: string) {
    return this.userInfoService.DeleteByUsername(username);
  }
}
