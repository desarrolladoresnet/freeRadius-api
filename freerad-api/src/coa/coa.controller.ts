import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoaService } from './coa.service';
import { ChangePlanDto } from 'src/dto/coa.dto';

@Controller('coa')
export class CoaController {
  constructor(private readonly coaService: CoaService) {}

  @Get('suspend/:username')
  async suspendUser(@Param('username') username: string) {
    console.log('Username', username);
    return this.coaService.SuspendUser(username);
  }

  @Get('activate/:username')
  async activateUser(@Param('username') username: string) {
    console.log('Username', username);
    return this.coaService.ActivateUser(username);
  }

  @Post()
  async changePlan(@Body() data: ChangePlanDto) {
    return this.coaService.ChangePlan(data);
  }
}
