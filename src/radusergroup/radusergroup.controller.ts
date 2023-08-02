import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RadusergroupService } from './radusergroup.service';
import { CreateRadusergroupDto } from './dto/create-radusergroup.dto';
import { UpdateRadusergroupDto } from './dto/update-radusergroup.dto';

@Controller('radusergroup')
export class RadusergroupController {
  constructor(private readonly radUserGroupService: RadusergroupService) {}

  @Get()
  getAllUserGroups() {
    return this.radUserGroupService.GetAllUserGroups();
  }

  @Post()
  createUserGroup(@Body() data: CreateRadusergroupDto) {
    return this.radUserGroupService.CreateRadUserGroup(data);
  }

  @Post('find')
  getById(@Body() data: UpdateRadusergroupDto) {
    return this.radUserGroupService.GetUserGroupById(data);
  }

  @Put()
  updateUserGroup(@Body() data: UpdateRadusergroupDto) {
    return this.radUserGroupService.UpdateUserGroup(data);
  }
}
