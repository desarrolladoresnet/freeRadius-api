import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RadcheckService } from './radcheck.service';
import { RadCheckDto, RadCheckUpdateDto } from 'src/dto/radcheck.dto';

@Controller('radcheck')
export class RadcheckController {
  constructor(private readonly radCheckService: RadcheckService) {}

  @Get()
  getAllRadCheck() {
    return this.radCheckService.GetAllRadCheck();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.radCheckService.GetById(id);
  }

  @Post()
  createRad(@Body() data: RadCheckDto) {
    return this.radCheckService.CreateRadCheck(data);
  }

  @Put(':id')
  updateradCheck(@Param('id') id: number, @Body() data: RadCheckUpdateDto) {
    return this.radCheckService.UpdateRadCheck(id, data);
  }
}
