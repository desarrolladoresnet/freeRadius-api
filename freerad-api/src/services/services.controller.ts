import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from '../dto/create-service.dto';
import { UpdateServiceDto } from 'src/dto/update-service.dto';
// import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private servService: ServicesService) {}

  @Post()
  create(@Body() createServtDto: CreateServiceDto) {
    return this.servService.create(createServtDto);
  }

  @Get()
  findAll() {
    return this.servService.findAll();
  }

  @Get('sync/:node')
  async sync(@Param('node') node: string) {
    return await this.servService.sync(node);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servService.findOne(+id);
  }

  @Get(':id/sys')
  findOneOnSys(@Param('id') id: string) {
    return this.servService.findOneOnSys(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServDto: UpdateServiceDto) {
    return this.servService.update(+id, updateServDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servService.remove(+id);
  }
}
