import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserinfoDto } from 'src/userinfo/dto/create-userinfo.dto';
import { RadiusService } from './radius.service';
import { NasService } from './nas.service';
import { CreateNasDto } from 'src/nas/dto/create-nas.dto';
import { CreateZoneDto } from 'src/zone/dto/create-zone.dto';
import { ZoneService } from './zone.service';

@Controller('radius')
export class RadiusController {
  constructor(
    private readonly radiusService: RadiusService,
    private readonly nasService: NasService,
    private readonly zoneService: ZoneService,
  ) {}

  ///////////////////////////////////////////////////////////////////

  // USUARIO

  ////////////////////////////////////////////////////////////////////

  @Get()
  findAllUsers() {
    return this.radiusService.FindAllUsers();
  }

  @Post()
  createUser(@Body() data: CreateUserinfoDto) {
    console.log(data);
    return this.radiusService.CreateUser(data);
  }

  ///////////////////////////////////////////////////////////////////

  // NAS

  ////////////////////////////////////////////////////////////////////

  @Post('nas')
  createNas(@Body() data: CreateNasDto) {
    return this.nasService.CreateNas(data);
  }

  @Get('nas')
  getAllNas() {
    return this.nasService.FindAllNas();
  }
  ///////////////////////////////////////////////////////////////////

  // ZONA

  ////////////////////////////////////////////////////////////////////

  @Post('zone')
  createZone(@Body() data: CreateZoneDto) {
    return this.zoneService.CreateZone(data);
  }

  @Get('zone')
  findAllZone() {
    return this.zoneService.FindAllZones();
  }
}