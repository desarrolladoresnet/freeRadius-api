import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { RadusergroupService } from './radusergroup.service';
import {
  RadUserGroupDto,
  RadUserGroupUpdateDto,
} from 'src/dto/radUserGroup.dto';

@Controller('radusergroup')
export class RadusergroupController {
  constructor(private readonly radUserGroupService: RadusergroupService) {}

  @Get()
  getAllUserGroups() {
    return this.radUserGroupService.GetAllUserGroups();
  }

  @Post()
  createUserGroup(@Body() data: RadUserGroupDto) {
    return this.radUserGroupService.CreateRadUserGroup(data);
  }

  @Post('find')
  getById(@Body() data: RadUserGroupUpdateDto) {
    return this.radUserGroupService.GetUserGroupById(data);
  }

  @Put()
  updateUserGroup(@Body() data: RadUserGroupUpdateDto) {
    return this.radUserGroupService.UpdateUserGroup(data);
  }

  // @Put('delete')
  // delete(@Body() data: RadUserGroupUpdateDto) {
  //   return this.radUserGroupService.DeleteUserGroup(data);
  // }
}
