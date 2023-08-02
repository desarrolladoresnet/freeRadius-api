import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { NasService } from './nas.service';
import { CreateNasDto } from './dto/create-nas.dto';
import { UpdateNasDto } from './dto/update-nas.dto';

@Controller('nas')
export class NasController {
  constructor(private readonly nasService: NasService) {}

  @Post()
  createNas(@Body() data: CreateNasDto) {
    return this.nasService.CreateNas(data);
  }

  @Get()
  getAllNas() {
    return this.nasService.FindAllNas();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.nasService.FindById(id);
  }

  @Put(':id')
  updateNas(@Param('id') id: number, @Body() data: CreateNasDto) {
    return this.nasService.UpdateNas(id, data);
  }
}
