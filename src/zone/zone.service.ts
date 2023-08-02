import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { Nas } from 'src/nas/entities/nas.entity';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepository: Repository<Zone>,
    @InjectRepository(Nas)
    private nasRepository: Repository<Nas>,
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async CreateZone(data: CreateZoneDto) {
    const { name, tlf, codigo_zona, Nas, coord } = data;

    console.log(`Creando nueva zona`);
    try {
      const isNas = await this.nasRepository.findOneBy({ id: Nas });

      if (!isNas) {
        console.log(`El id del NAS: ${Nas}, no existe en la Base de Datos`);
        console.log(`------------------------------------------------\n`);
        return `El id del NAS: ${Nas}, no existe en la Base de Datos`;
      }

      const isZone = await this.zoneRepository.findBy({ name: name });

      if (isZone?.length > 0) {
        console.log(`Ya hay una zona con el nombre: ${name}`);
        console.log(`------------------------------------------------\n`);
        return isZone;
      }

      const newZone = await this.zoneRepository.create({
        name,
        tlf,
        codigo_zona,
        Nas,
        coord,
      });

      const saveZone = await this.zoneRepository.save(newZone);

      console.log(`------------------------------------------------\n`);
      return saveZone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async FindAllZones() {
    try {
      const zones = await this.zoneRepository.find();
      console.log(`Buscando zonas`);
      if (zones?.length < 1) {
        console.log(`No hay zonas registradas`);
        console.log(`------------------------------------------------\n`);
        return 'No hay zonas registradas';
      }

      console.log(`------------------------------------------------\n`);
      return zones;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async FindById(id: number) {
    try {
      const zone = await this.zoneRepository.findOneBy({ id: id });

      console.log(`Buscando zona con id: ${id}`);
      if (!zone) {
        console.log(`------------------------------------------------\n`);
        return `No se encontro una zona con el id: ${id}`;
      }
      console.log(`Zona encontrada`, zone);

      console.log(`------------------------------------------------\n`);
      return zone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async UpdateZone(id: number, data: CreateZoneDto) {
    const { name, tlf, codigo_zona, Nas, coord } = data;

    try {
      console.log(`Haciendo update de zona: ${name}`);
      const zone = await this.zoneRepository.findOneBy({ id: id });

      if (!zone) {
        console.log(`No hay zone con el id: ${id}`);
        console.log(`------------------------------------------------\n`);
        return `No hay zone con el id: ${id}`;
      }

      const isNas = await this.nasRepository.findOneBy({ id: Nas });

      if (!isNas) {
        console.log(`El id del NAS: ${Nas}, no existe en la Base de Datos`);
        console.log(`------------------------------------------------\n`);
        return `El id del NAS: ${Nas}, no existe en la Base de Datos`;
      }

      zone.name = name;
      zone.tlf = tlf;
      zone.codigo_zona = codigo_zona;
      zone.Nas = Nas;
      zone.coord = coord;

      const updateZone = await this.zoneRepository.save(zone);

      if (!updateZone) {
        console.log(`'Hubo un problema al hacer el update'`);
        console.log(`------------------------------------------------\n`);
        return 'Hubo un problema al hacer el update';
      }

      console.log(`------------------------------------------------\n`);
      return updateZone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }
}
