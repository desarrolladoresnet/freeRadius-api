import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CoaService } from './coa.service';

@Controller('coa')
export class CoaController {
  constructor(private readonly coaService: CoaService) {}

  @Get(':username')
  async coaCmd(@Param('username') username: string) {
    console.log('Username', username);
    return this.coaService.SuspendUser(username);
  }
}
