/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Nas } from 'src/database/entities/nas.entity';
import { NasDto, NasDtoUpdate } from 'src/dto/nas.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NasService {
  constructor(
    @InjectRepository(Nas)
    private nasRepository: Repository<Nas>,
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Crea una entrada en la tabla NAS.
   * @param data { NasDto }, ver el nas.dto en la carpeta dto.
   * @returns { object }
   */
  async CreateNas(data: NasDto) {
    try {
      const { name, ip_address, secret } = data;

      //* Verifica si el username ya existe. *//
      const date = new Date();
      console.log(`Creando NAS con el name: ${name}.\nFecha: ${date}\n`);

      const isNas = await this.nasRepository.findBy({
        nasname: ip_address,
      });
      if (isNas?.length > 0) {
        const str = `Ya existe un NAS con ese IP: ${ip_address}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: str,
          },
          HttpStatus.CONFLICT,
          {
            cause: err,
          },
        );
      }

      //* Crea una nueva entrada, el metdodo posee valores por defecto para no dejar espacio nulos en la memoria *//
      const newNas = this.nasRepository.create({
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
      const nas = await this.nasRepository.save(newNas);

      //* Se verifica que se guarde correctamente la entrada. *//
      if (!nas) {
        const str = `Hubo un error al guardar los datos`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          },
        );
      }

      console.log(`------------------------------------------------\n`);
      return nas;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Busca todas las entradas en la tabla NAS.
   * @TODO paginar!
   * @returns { array }
   */
  async FindAllNas() {
    try {
      const date = new Date();
      console.log(`Buscando los NAS.\nFecha: ${date}\n`);
      const allNas = await this.nasRepository.find();

      //* Verifica la existencia de entradas en la tabla. *//
      if (allNas?.length < 1) {
        const str = `No se encontraron NAS`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }

      console.log(`------------------------------------------------\n`);
      return allNas;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Busqueda de una entrada por su id.
   * @param id { number }
   * @returns { object }
   */
  async FindById(id: number) {
    try {
      //* Busqueda de la entrada *//
      const date = new Date();
      console.log(`Buscandos NAS con el id: ${id}.\nFecha: ${date}\n`);
      const nas = await this.nasRepository.findOneBy({ id: id });

      //* Verificacion de que exista la entrada buscada. *//
      if (!nas) {
        const str = `No se encontro un NAS con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }

      console.log(`------------------------------------------------\n`);
      return nas;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * PErmite hacer update a una entrada del NAS.
   * Puede que el metodo tenga que ser desechadoo al menos la ruta que lo llama.
   * @param id { number }
   * @param data { NasDto } 
   * @returns { object }
   */
  async UpdateNas(id: number, data: NasDtoUpdate) {
    const { name , ip_address, secret, ports, server, type, community, description } = data;

    const date = new Date();
    console.log(`Actualizando NAS con el id: ${id}.\nFecha: ${date}\n`);

    if( !name && !ip_address && !secret && !ports && !server && !type && !community && !description){
      const str = `No hay valores para realizar el update`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: str,
          },
          HttpStatus.BAD_REQUEST,
          {
            cause: err,
          }
        );
    }
    try {

      const nas = await this.nasRepository.findOneBy({ id: id });

      //* Verificacion de que exista la entrada buscada. *//
      if (!nas) {
        const str = `No se encontro un NAS con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          },
        );
      }

      nas.community = data?.community ? data.community : nas.community;
      nas.description = data?.description ? data.description : nas.description;
      nas.nasname = data?.ip_address ? data.ip_address : nas.nasname; // en el nasname va la direccion ip
      nas.ports = data?.ports ? data.ports : nas.ports;
      nas.server = data?.server ? data.server : nas.server;
      nas.secret = data?.secret ? data.secret : nas.secret;
      nas.shortname = data?.name ? data.name : nas.shortname; //el shortname viene del campo name
      nas.type = data?.type ? data.type : nas.type;

      const updateNas = await this.nasRepository.save(nas);

      //* Verificacion de update del NAS. *//
      if (!updateNas) {
        const str = `No se puedo actualizar el NAS`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str);
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          },
        );
      }

      console.log(`------------------------------------------------\n`);
      return updateNas;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
