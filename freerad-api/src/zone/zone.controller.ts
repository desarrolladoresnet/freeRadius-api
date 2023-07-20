import { Body, Controller, Get, Post } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDto } from 'src/dto/zone.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly soneService: ZoneService) {}

  @Post()
  createZone(@Body() data: ZoneDto) {
    return this.soneService.CreateZone(data);
  }

  @Get()
  findAllZone() {
    return this.soneService.FindAllZones();
  }
}
