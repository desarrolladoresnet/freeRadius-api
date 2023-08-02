import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Zone } from 'src/zone/entities/zone.entity';
import { CreateZoneDto } from 'src/zone/dto/create-zone.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepository: Repository<Zone>,
  ) {}

  async CreateZone(data: CreateZoneDto ) {
    const { name, tlf, codigo_zona, Nas, coord } = data;

    try {

      /**
       *  Confirmar que el NAS existe antes de confinuar la ejecucion
       * 
       *    if !NAS
       *        return el nas no existe / status code 400
       * 
       */

      const isZone = await this.zoneRepository.findBy({ name: name })

      if (isZone?.length > 0){
        return isZone;
      }

      const newZone = await this.zoneRepository.create({
        name,
        tlf,
        codigo_zona,
        Nas,
        coord
      });

      const saveZone = await this.zoneRepository.save(newZone);

      return saveZone;

    } catch (error) {
      return error;
    }
  }

  async FindAllZones() {
    try {
      const users = await this.zoneRepository.find();

      if (users?.length < 1) {
        return "No hay zonas registradas";
      }

      return users;
    } catch (error) {
      return error;
    }
  }
}