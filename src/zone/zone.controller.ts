import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Post()
  createZone(@Body() data: CreateZoneDto) {
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
  updateZone(@Param('id') id: number, @Body() data: CreateZoneDto) {
    return this.zoneService.UpdateZone(id, data);
  }
}
