import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nas } from 'src/database/nas.entity';
import { Zone } from 'src/database/zone.entity';
import { ZoneDto } from 'src/dto/zone.dto';
import { Repository } from 'typeorm';

/**
 * Metodos para manipular la tabla zone.
 */
@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private zoneRepository: Repository<Zone>,
    @InjectRepository(Nas)
    private nasRepository: Repository<Nas>,
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Crea una nueva entrada en la tabla.
   * Todos los parametros de la desestructuracion son necesarios para crear una zona,
   * { name, tlf, codigo_zona, Nas, coord }, si falta alguno el dto rechazara la peticion.
   * @param data { ZoneDto }
   * @returns { object }
   */
  async CreateZone(data: ZoneDto) {
    const { name, tlf, codigo_zona, Nas, coord } = data;

    console.log(`Creando nueva zona`);
    try {
      //* Verifica que el NAS sea valido *//
      const isNas = await this.nasRepository.findOneBy({ id: Nas });
      if (!isNas) {
        const str = `El id del NAS: ${Nas}, no existe en la Base de Datos`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      //* Verifica que no haya un nas con el mismo nombre *//
      const isZone = await this.zoneRepository.findBy({ name: name });
      if (isZone?.length > 0) {
        const str = `Ya hay una zona con el nombre: ${name}`;
        console.log(`${str}------------------------------------------------\n`);
        return str;
      }

      //* Crea la nueva zona *//
      const newZone = await this.zoneRepository.create({
        name,
        tlf,
        codigo_zona,
        Nas,
        coord,
      });

      const saveZone = await this.zoneRepository.save(newZone);

      console.log(`Zona creada exitosamente`);
      console.log(`------------------------------------------------\n`);
      return saveZone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite traer todas las entradas que posee la tabla.
   * @todo paginar
   * @returns { Array }
   */
  async FindAllZones() {
    try {
      const zones = await this.zoneRepository.find();
      console.log(`Buscando zonas`);
      if (zones?.length < 1) {
        console.log(`No hay zonas registradas`);
        console.log(`------------------------------------------------\n`);
        return 'No hay zonas registradas';
      }

      console.log(`Se encontraron ${zones?.length} zonas.`);
      console.log(`------------------------------------------------\n`);
      return zones;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Encuentra una entrada haciendo uso del id.
   * @param id { number }
   * @returns { object }
   */
  async FindById(id: number) {
    try {
      console.log(`Buscando zona con id: ${id}`);

      const zone = await this.zoneRepository.findOneBy({ id: id });
      if (!zone) {
        const str = `No se encontro una zona con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`Zona encontrada`);
      console.log(`------------------------------------------------\n`);
      return zone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite realizar un update de una entrada usando el id.
   * @param id { number }
   * @param data { ZoneDto }
   * @returns { object }
   */
  async UpdateZone(id: number, data: ZoneDto) {
    const { name, tlf, codigo_zona, Nas, coord } = data;

    //* Verifica que existan valores para realizar update *//
    if (!name && !tlf && !codigo_zona && !Nas && !coord) {
      const str = `No hay valores para realizar update`;
      console.log(`${str}\n------------------------------------------------\n`);
      return str;
    }
    try {
      //* Se busca la zona *//
      console.log(`Haciendo update de zona: ${name}`);
      const zone = await this.zoneRepository.findOneBy({ id: id });
      if (!zone) {
        const str = `No hay zone con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      //* Verifica existencia del NAS *//
      const isNas = await this.nasRepository.findOneBy({ id: Nas });
      if (!isNas) {
        console.log(`El id del NAS: ${Nas}, no existe en la Base de Datos`);
        console.log(`------------------------------------------------\n`);
        return `El id del NAS: ${Nas}, no existe en la Base de Datos`;
      }

      //* Update de los valores *//
      zone.name = name;
      zone.tlf = tlf;
      zone.codigo_zona = codigo_zona;
      zone.Nas = Nas;
      zone.coord = coord;

      const updateZone = await this.zoneRepository.save(zone);

      if (!updateZone) {
        const str = `'Hubo un problema al hacer el update'`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(
        `Update exitoso.\n------------------------------------------------\n`,
      );
      return updateZone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }
}
