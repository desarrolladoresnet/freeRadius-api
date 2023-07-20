import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
