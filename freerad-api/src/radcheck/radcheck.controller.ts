import { Body, Controller, Get, Post } from '@nestjs/common';
import { RadcheckService } from './radcheck.service';

@Controller('radcheck')
export class RadcheckController {
  constructor(private readonly radCheckService: RadcheckService) {}

  @Get()
  getAllRadCheck() {
    return this.radCheckService.GetAllRadCheck();
  }

  @Post()
  createRad(@Body() data: any) {
    return this.radCheckService.CreateRadCheck(data);
  }
}
