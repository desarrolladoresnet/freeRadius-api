import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { RadcheckService } from './radcheck.service';
import { CreateRadcheckDto } from './dto/create-radcheck.dto';
import { UpdateRadcheckDto } from './dto/update-radcheck.dto';

@Controller('radcheck')
export class RadcheckController {constructor(private readonly radCheckService: RadcheckService) {}

@Get()
getAllRadCheck() {
  return this.radCheckService.GetAllRadCheck();
}

@Get(':id')
getById(@Param('id') id: number) {
  return this.radCheckService.GetById(id);
}

@Post()
createRad(@Body() data: CreateRadcheckDto) {
  return this.radCheckService.CreateRadCheck(data);
}

@Put(':id')
updateradCheck(@Param('id') id: number, @Body() data: UpdateRadcheckDto) {
  return this.radCheckService.UpdateRadCheck(id, data);
}
}
