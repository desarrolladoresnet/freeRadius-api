import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { RadiusService } from './radius.service';
import { NasService } from './nas.service';
import { NasDto } from 'src/dto/nas.dto';
import { ZoneDto } from 'src/dto/zone.dto';
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
  createUser(@Body() data: UserDto) {
    console.log(data);
    return this.radiusService.CreateUser(data);
  }

  ///////////////////////////////////////////////////////////////////

  // NAS

  ////////////////////////////////////////////////////////////////////

  @Post('nas')
  createNas(@Body() data: NasDto) {
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
  createZone(@Body() data: ZoneDto) {
    return this.zoneService.CreateZone(data);
  }

  @Get('zone')
  findAllZone() {
    return this.zoneService.FindAllZones();
  }
}
