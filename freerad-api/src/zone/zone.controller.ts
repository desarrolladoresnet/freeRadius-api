import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneDto } from 'src/dto/zone.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  createZone(@Body() data: ZoneDto) {
    return this.zoneService.CreateZone(data);
  }

  @Get()
  findAllZone() {
    return this.zoneService.FindAllZones();
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.zoneService.FindById(id);
  }

  @Put(':id')
  updateZone(@Param('id') id: number, @Body() data: ZoneDto) {
    return this.zoneService.UpdateZone(id, data);
  }
}
