import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';

@Controller('systems')
export class SystemsController {
  constructor(private readonly sysService: SystemsService) {}

  @Post()
  async create(@Body() createSysDto: CreateSystemDto) {
    return await this.sysService.create(createSysDto)
  }
    

  @Get()
  findAll() {
    return this.sysService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try{
      return await this.sysService.findOne(+id);
    } catch (e) {
      throw new HttpException('Error', HttpStatus.I_AM_A_TEAPOT)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSysDto: UpdateSystemDto) {
    return this.sysService.update(+id, updateSysDto);
  }

  @Get(':id/:node')
  async sysNode(@Param('id') id:string, @Param('node') node:string){
    return await this.sysService.sysNode(+id,node)
  }

  @Get(':id/all')
  allOnSys(@Param('id') id: string) {
    return this.sysService.allOnSys(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysService.remove(+id);
  }
}
