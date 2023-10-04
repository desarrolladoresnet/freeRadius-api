import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RadGroupReplyService } from './radgroupreply.service';
import { CreateRadGroupReplyDto, UpdateRadGroupReplyDto } from 'src/dto/index';
import { AuthGuard } from '@nestjs/passport';

@Controller('planes')
@UseGuards(AuthGuard('jwt'))
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
