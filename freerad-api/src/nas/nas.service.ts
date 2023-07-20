import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nas } from 'src/database/nas.entity';
import { NasDto } from 'src/dto/nas.dto';

import { Repository } from 'typeorm';

@Injectable()
export class NasService {
  constructor(
    @InjectRepository(Nas)
    private nasRepository: Repository<Nas>,
  ) {}

  async CreateNas(data: NasDto) {
    try {
      const { name, ip_address, secret } = data;

      const isNas = await this.nasRepository.findBy({
        nasname: ip_address,
      });

      console.log('El nas existe:', isNas?.length > 0);
      if (isNas?.length > 0) {
        return isNas;
      }

      const newLocal = this.nasRepository.create({
        shortname: name,
        nasname: ip_address,
        secret: secret,
        /* OPCIONALES */
        type: data?.type ? data.type : '0',
        ports: data?.type ? data.ports : 0,
        server: data?.server ? data.server : '0',
        community: data?.community ? data.community : '0',
        description: data?.description ? data.description : '0',
      });
      const newNas = newLocal;

      const nas = await this.nasRepository.save(newNas);

      return nas;
    } catch (error) {
      return error;
    }
  }

  async FindAllNas() {
    try {
      const allNas = await this.nasRepository.find();

      if (allNas?.length < 1) {
        return 'no se encontro nas';
      }

      return allNas;
    } catch (error) {
      return error;
    }
  }
}
