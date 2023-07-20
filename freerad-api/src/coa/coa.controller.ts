import { Body, Controller, Post } from '@nestjs/common';
import { CoaService } from './coa.service';

@Controller('coa')
export class CoaController {
  constructor(private readonly coaService: CoaService) {}

  @Post()
  async coaCmd(@Body() data: any) {
    return this.coaService.CoA_cmd(data);
  }
}
