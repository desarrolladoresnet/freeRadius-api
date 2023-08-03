/* eslint-disable prettier/prettier */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
// import { CreateSystemDto } from '../dto/create-system.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from '../database/system.entity';
import { UpdateSystemDto } from 'src/dto/update-system.dto';

@Injectable()
export class SystemsService {
  constructor(
    @InjectRepository(System)
    private sysRepository: Repository<System>,
  ) {}

  private readonly systems: System[] = [];

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite crear una nueva entada en la tabla System.
   * @param sys { system }
   * @returns { object } 
   */
  async CreateSys(sys: System) {
    const { name, apiKey, endPoint } = sys;
    //this.systems.push(sys);
    try {
      console.log(`Creando entrada en 'system'`);
      const isSys = await this.sysRepository.find({
        where: [{ name }, { apiKey }, { endPoint }]
      });

      if (isSys.length > 0) {
        const str = `Ya hay una entrada en la tabla 'system' con alguno de lo valores enviados`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
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
        return str;
      }

      console.log(`Guardado exitoso de entrada en 'system' con los valores name: ${name} y endopoint: ${endPoint}`);
      return saveSys;
    }
    catch (error) {
      console.log(error);
      return error;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  async FindAllSys() {
    try {
      console.log(`Buscando entradas en la tabla 'system'`);
      const systems = await this.sysRepository.find();

      if (systems?.length < 1) {
        const str = `No se encontraron entradas en la tabla 'system'`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`Se encontraron ${systems?.length} 
      entradas.\n------------------------------------------------\n`);
      return systems;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  async FindOneSys(id: number) {
    try {
      console.log(`Buscando una entrada en 'system' con el id: ${id}`);

      const sys = await this.sysRepository.findOneBy({ id });

      if (!sys) {
        const str = `No se pudo encontrar una entrada en 'system' con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`Entrada encontrada.\n------------------------------------------------\n`);
      return sys;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Buscas todos los servicios en el sistema.
   * @param id { number }
   * @returns { Array }
   */
  async AllOnSys(id: number) {
    try {
      console.log(`Buscando los servicios en el sistema con el id: ${id}.`);
      const sys = await this.sysRepository.findOneBy({ id });
      if (!sys) {
        const str = `No se pudo encontrar una entrada en 'system' con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
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
      return error;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * 
   * @param id { number }
   * @param node { string }
   * @returns 
   */
  public async SysNode(id: number, node: string) {
    try {
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
      return nodos
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }

  }

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
      const str = `No hay valores para actualizar`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

    try {
      console.log(`Realizando update en 'system' con id: ${id}`);

      const update = await this.sysRepository.update(id, updateSysDto);

      if (!update) {
        const str = `No se pudo encontrar una entrada en 'system' con el id: ${id}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`Entrada actualizada exitosamente`);
      return `Sistema ${id} actualizado`;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Elimina una entrada de ls tabla 'system'.
   * @param id { number }
   */
  async RemoveSys(id: number) {
    try {
      console.log(`Eliminando entrada con el id: ${id}`);

      const del = await this.sysRepository.delete(id);

      if (!del) {
        const str = `Hubo un error al elminar la entrada`;
        console.log(`${str}\n------------------------------------------------\n`);
        return str;
      }

      console.log(`Entrada eliminada exitosamente.`);
      return del;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }
}
