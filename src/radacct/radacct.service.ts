import { Injectable } from '@nestjs/common';
import { CreateRadacctDto } from './dto/create-radacct.dto';
import { UpdateRadacctDto } from './dto/update-radacct.dto';

@Injectable()
export class RadacctService {
  create(createRadacctDto: CreateRadacctDto) {
    return 'This action adds a new radacct';
  }

  findAll() {
    return `This action returns all radacct`;
  }

  findOne(id: number) {
    return `This action returns a #${id} radacct`;
  }

  update(id: number, updateRadacctDto: UpdateRadacctDto) {
    return `This action updates a #${id} radacct`;
  }

  remove(id: number) {
    return `This action removes a #${id} radacct`;
  }
}
