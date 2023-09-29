import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateNodeDto } from 'src/dto/index';
import { ZonaCliente } from '../database/entities/index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/**
 * Metodos del modulo nodo.
 */
@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(ZonaCliente)
    private readonly nodeRepository: Repository<ZonaCliente>,
  ) {}

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Vrea una nueva entrada en la tabla ZonaCliente
   * @param node
   * @returns { object }
   */
  async CreateNodo(node: ZonaCliente) {
    const { name, systems } = node;
    try {
      const date = new Date();
      console.log(
        `Creado nueva ZonaCliente/Nodo con name: ${name} y system: ${systems}.\nFecha: ${date}\n`,
      );

      const isZona = await this.nodeRepository.findOneBy({ name });

      if (isZona) {
        const str = `Ya existe una zona con el el name: ${name}`;
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

      const nodeNew = await this.nodeRepository.create({
        name,
        systems,
      });
      const nodeSave = await this.nodeRepository.save(nodeNew);
      if (!nodeSave) {
        const str = `Hubo un problema al crear la ZonaCliente/Nodo con el el name: ${name}`;
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
      console.log(
        `ZonaCliente/Nodo creada exitosamente.\n------------------------------------------------\n`,
      );
      return nodeSave;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Busca todas la entradas asociadas.
   * @returns { Array }
   */
  async FindAllNodes() {
    try {
      const date = new Date();
      console.log(`Buscando todas las ZonaClientes/Nodos.\nFecha: ${date}\n`);
      const zonasNodos = await this.nodeRepository.find({
        relations: ['systems'],
      });

      if (zonasNodos?.length < 1) {
        const str = `No se encontraron ZonaCliente/Nodos en la tabla.`;
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

      console.log(
        `${zonasNodos?.length} ZonaCliente/nodos encontradas.\n------------------------------------------------\n`,
      );
      return zonasNodos;
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
   * Encuentra una entrada a partir del id.
   * @param id { number }
   * @returns { object }
   */
  async FindOneNode(id: number) {
    try {
      const date = new Date();
      console.log(
        `Buscando una ZonaCliente/Nodo con el id: ${id}.\nFecha: ${date}\n`,
      );

      const nodo = await this.nodeRepository.findOne({
        where: { id: id },
        relations: ['systems'],
      });

      if (!nodo) {
        const str = `No se encontraron ZonaCliente/Nodo con el id: ${id}.`;
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

      console.log(`ZonaCLiente/Nodo encontrado`);
      console.log(`------------------------------------------------\n`);

      return nodo;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Metodo para hacer update a las entradas de la tabla.
   * Si name y system llegan vacios la solicitud se rechaza.
   * @param id { number }
   * @param updateNodeDto { UpdateNodeDto }
   * @returns { object }
   */
  async UpdateNode(id: number, updateNodeDto: UpdateNodeDto) {
    const { name, systems } = updateNodeDto;

    const date = new Date();
    console.log(
      `Haciendo update al ZonaCliente/Nodo con id: ${id}.\nFecha: ${date}\n`,
    );

    if (!name && !systems) {
      const str = `No hay valores para realizar updates.`;
      console.log(`${str}\n------------------------------------------------\n`);
      const err = new Error(str);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: str,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    }

    try {
      const zoneToUpdate = await this.nodeRepository.findOneBy({ id });
      if (!zoneToUpdate) {
        const str = `No se encontró ZonaCliente/Nodo con el id: ${id}.`;
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

      //* Actualizando *//
      zoneToUpdate.name = name;
      zoneToUpdate.systems = systems;

      const saveUpdate = await this.nodeRepository.save(zoneToUpdate);
      if (!saveUpdate) {
        const str = `Hubo un problema al salvar los cambios.`;
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

      console.log(`Update realizado exitosamente.`);
      console.log(`------------------------------------------------\n`);
      return saveUpdate;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Metodo para remover una entrada de la tabla mediante el id.
   * @param id { number }
   * @returns { object }
   */
  async RemoveNode(id: number) {
    try {
      const date = new Date();
      console.log(
        `Eliminando ZonaCliente/Nodo con id: ${id}.\nFecha: ${date}\n`,
      );

      const del = await this.nodeRepository.delete(id);

      if (!del) {
        const str = `No se pudo eliminar la ZonaCliente/Nodo.`;
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

      console.log(`Entrada eliminada exitosamente`);
      console.log(`------------------------------------------------\n`);

      return del;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
