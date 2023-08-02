import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RadacctService } from './radacct.service';
import { CreateRadacctDto } from './dto/create-radacct.dto';
import { UpdateRadacctDto } from './dto/update-radacct.dto';

@Controller('radacct')
export class RadacctController {
  constructor(private readonly radacctService: RadacctService) {}

  @Post()
  create(@Body() createRadacctDto: CreateRadacctDto) {
    return this.radacctService.create(createRadacctDto);
  }

  @Get()
  findAll() {
    return this.radacctService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.radacctService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRadacctDto: UpdateRadacctDto) {
    return this.radacctService.update(+id, updateRadacctDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.radacctService.remove(+id);
  }
}
