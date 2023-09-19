/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RadGroupReplyService } from './radgroupreply.service';
import { CreateRadGroupReplyDto } from 'src/dto/radGroupReply.dto';
import { UpdateRadGroupReplyDto } from 'src/dto/radGroupReply.dto';

@Controller('planes')
export class RadGroupReplyController {
  constructor(private radgroupreplyService: RadGroupReplyService) {}

  @Post()
  async create(@Body() createRadGroupReplyDto: CreateRadGroupReplyDto) {
    return await this.radgroupreplyService.create(createRadGroupReplyDto);
  }

  @Get()
  findAll() {
    return this.radgroupreplyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.radgroupreplyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePlanDto: UpdateRadGroupReplyDto,
  ) {
    this.radgroupreplyService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.radgroupreplyService.remove(+id);
  }
}
