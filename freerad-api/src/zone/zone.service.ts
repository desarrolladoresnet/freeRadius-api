/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nas } from 'src/database/entities/nas.entity';
import { Zone } from 'src/database/entities/zone.entity';
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

    console.log(
      `Creando nueva zona con los valores name: ${name}, tlg: ${tlf}, codigo_zona: ${codigo_zona}, Nas: ${Nas} y coord: ${coord}`,
    );

    try {
      //* Verifica que el NAS sea valido *//
      const isNas = await this.nasRepository.findOneBy({ id: Nas });
      if (!isNas) {
        const str = `El id del NAS: ${Nas}, no existe en la Base de Datos`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      //* Verifica que no haya un nas con el mismo nombre *//
      const isZone = await this.zoneRepository.findBy({ name: name });
      if (isZone?.length > 0) {
        const str = `Ya hay una zona con el nombre: ${name}`;
        console.log(`${str}------------------------------------------------\n`);
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: str,
          },
          HttpStatus.CONFLICT,
        );
      }

      //* Crea la nueva zona *//
      const newZone = await this.zoneRepository.create({
        name,
        tlf,
        codigo_zona,
        Nas,
        coord,
      });

      console.log(`Guardando datos de la nueva zona`);
      const saveZone = await this.zoneRepository.save(newZone);
      if (!saveZone) {
        const str = `Hubo un problema al guardar la zona`;
        console.log(`${str}------------------------------------------------\n`);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.log(`Zona creada exitosamente`);
      console.log(`------------------------------------------------\n`);
      return saveZone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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
        const str = `No hay zonas registradas`;
        console.log(`------------------------------------------------\n`);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      console.log(`Se encontraron ${zones?.length} zonas.`);
      console.log(`------------------------------------------------\n`);
      return zones;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      console.log(`Zona encontrada`);
      console.log(`------------------------------------------------\n`);
      return zone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: str,
        },
        HttpStatus.BAD_REQUEST,
      );
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
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      //* Verifica existencia del NAS *//
      const isNas = await this.nasRepository.findOneBy({ id: Nas });
      if (!isNas) {
        const str = `El id del NAS: ${Nas}, no existe en la Base de Datos`;
        console.log(`------------------------------------------------\n`);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
        );
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
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      console.log(
        `Update exitoso.\n------------------------------------------------\n`,
      );
      return updateZone;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
