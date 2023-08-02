import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserinfoService } from './userinfo.service';
import { CreateUserinfoDto } from './dto/create-userinfo.dto';
import { UpdateUserinfoDto } from './dto/update-userinfo.dto';

@Controller('userinfo')
export class UserinfoController {
  constructor(private readonly userInfoService: UserinfoService) {}

  @Post()
  createUser(@Body() data: CreateUserinfoDto) {
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
  updateUserInfo(@Param('id') id: number, @Body() data: UpdateUserinfoDto) {
    return this.userInfoService.UpdateUserInfo(id, data);
  }
}
