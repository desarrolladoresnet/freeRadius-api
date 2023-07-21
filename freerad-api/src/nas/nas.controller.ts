import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { NasService } from './nas.service';
import { NasDto } from 'src/dto/nas.dto';

@Controller('nas')
export class NasController {
  constructor(private readonly nasService: NasService) {}

  @Post()
  createNas(@Body() data: NasDto) {
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
  updateNas(@Param('id') id: number, @Body() data: NasDto) {
    return this.nasService.UpdateNas(id, data);
  }
}
