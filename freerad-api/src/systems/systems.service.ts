/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { CreateSystemDto } from '../dto/create-system.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from '../database/entities/system.entity';
import { UpdateSystemDto } from 'src/dto/update-system.dto';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System)
    private sysRepository: Repository<System>,
  ) {}

  private readonly systems: System[] = [];

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  /** 
   * Permite crear una nueva entada en la tabla System.
   * @param sys { system }
   * @returns { object } 
   */
  async CreateSys(sys: System): Promise<System> {
    const { name, apiKey, endPoint } = sys;
    //this.systems.push(sys);
    try {
      const date = new Date();
      console.log(`Creando entrada en 'system'.\nFecha: ${date}\n`);
      const isSys = await this.sysRepository.find({
        where: [{ name }, { apiKey }, { endPoint }]
      });

      if (isSys.length > 0) {
        const str = `Ya hay una entrada en la tabla 'system' con alguno de lo valores enviados`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: str,
          },
          HttpStatus.CONFLICT,
          {
            cause: err,
          }
        );
      }

      const systNew = await this.sysRepository.create({
        name,
        apiKey,
        endPoint,
      });

      const saveSys = await this.sysRepository.save(systNew);
      if (!saveSys) {
        const str = `Hubo un error al guardar la entrada en 'system' con los valores name: ${name} y endopoint: ${endPoint}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          }
        );
      }

      console.log(`Guardado exitoso de entrada en 'system' con los valores name: ${name} y endopoint: ${endPoint}`);
      return saveSys;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Devuelve un Array con todos las entradas encontradas.
   * @returns { Array }
   */
  async FindAllSys(): Promise<System[]> {
    try {
      const date = new Date();
      console.log(`Buscando entradas en la tabla 'system'.\nFecha: ${date}\n`)
      const systems = await this.sysRepository.find();

      if (systems?.length < 1) {
        const str = `No se encontraron entradas en la tabla 'system'`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          }
        );
      }

      console.log(`Se encontraron ${systems?.length} 
      entradas.\n------------------------------------------------\n`);
      return systems;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  async FindOneSys(id: number): Promise<System> {
    try {
      const date = new Date();
      console.log(`Buscando una entrada en 'system' con el id: ${id}.\nFecha: ${date}\n`)

      const sys = await this.sysRepository.findOneBy({ id });

      if (!sys) {
        const str = `No se pudo encontrar una entrada en 'system' con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          }
        );
      }

      console.log(`Entrada encontrada.\n------------------------------------------------\n`);
      return sys;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Busca todos los servicios en el sistema.
   * @param id { number }
   * @returns { Array }
   */
  async AllOnSys(id: number):  Promise<object[]> {
    try {
      const date = new Date();
      console.log(`Buscando los servicios en el sistema con el id: ${id}.\nFecha: ${date}\n`);
      const sys = await this.sysRepository.findOneBy({ id });

      if (!sys) {
        const str = `No se pudo encontrar una entrada en 'system' con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          }
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      //const ep = sys.endPoint;

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const superagent = require('superagent');
      const find = await superagent
        .get(`${sys.endPoint}`)
        .set('authorization', `Api-Key ${sys.apiKey}`)
        .set('content-type', 'application/json')
        .then((res) => res.body['results']);

      console.log(`Servicio(s) encontrados`);
      return find;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Busca información de los nodos con un id.
   * @param id { number }
   * @param node { string }
   * @returns 
   */
  public async SysNode(id: number, node: string) {
    try {
      const date = new Date();
      console.log(`Buscando información de los nodos.\nFecha: ${date}\n`);

      const all = await this.AllOnSys(id);
      console.log(node);
      const nodeList: any[] = [];
      all.forEach(async (i) => {
        if (i['router']['nombre'] == node) {
          nodeList.push(i);
        }
      });
      console.log(nodeList);
      const nodos = await nodeList;

      if (nodeList?.length < 1) {
        const str = `No se encontro información de los nodos en el sistema`;
        console.log(str);
        console.log(`------------------------------------------------\n`);
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: str,
          },
          HttpStatus.NOT_FOUND,
          {
            cause: err,
          }
        );
      }
      console.log(`Información de los nodos encontrada`);
      return nodos
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite realizar un update de una entrada de la tabla 'system'.
   * @param id { number }
   * @param updateSysDto  { UpdateSystemDto }
   * @returns 
   */
  async UpdateSys(id: number, updateSysDto: UpdateSystemDto) {
    const { name, apiKey, endPoint } = updateSysDto;

    //* Verifica que hayan valores para actualizar *//
    if (!name && !apiKey && !endPoint ) {
      const str = `No hay valores para actualizar. Tabla system.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

    try {
      const date = new Date();
      console.log(`Realizando update en 'system' con id: ${id}\nFecha: ${date}\n`);

      const update = await this.sysRepository.update(id, updateSysDto);

      if (!update) {
        const str = `No se pudo encontrar una entrada en 'system' con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          }
        );
      }

      console.log(`Entrada actualizada exitosamente`);
      return `Sistema ${id} actualizado`;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Elimina una entrada de ls tabla 'system'.
   * @param id { number }
   */
  async RemoveSys(id: number): Promise<object> {
    try {
      const date = new Date();
      console.log(`Eliminando entrada de 'system' con el id: ${id}\nFecha: ${date}\n`);

      const del = await this.sysRepository.delete(id);

      if (!del) {
        const str = `Hubo un error al elminar la entrada`;
        console.log(`${str}\n------------------------------------------------\n`);
        
        const err = new Error(str)
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: str,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
          {
            cause: err,
          }
        );
      }

      console.log(`Entrada eliminada exitosamente.`);
      return del;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
