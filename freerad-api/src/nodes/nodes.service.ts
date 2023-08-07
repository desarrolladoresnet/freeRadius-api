/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { CreateNodeDto } from '../database/create-node.dto';
// import { UpdateNodeDto } from './dto/update-node.dto';
import { UpdateNodeDto } from 'src/database/update-node.dto';
import { ZonaCliente } from '../database/node.entity';
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

  /**
   * Vrea una nueva entrada en la tabla ZonaCliente
   * @param node 
   * @returns 
   */
  async CreateNodo(node: ZonaCliente) {
    const { name, systems } = node;
    try {
      console.log(`Creado nueva ZonaCliente/Nodo con name: ${name} y system: ${systems}`);

      const isZona = await this.nodeRepository.findOneBy({ name });

      if (isZona) {
        const str = `Ya existe una zona con el el name: ${name}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      const nodeNew = await this.nodeRepository.create({
        name,
        systems,
      });
      const nodeSave =  await this.nodeRepository.save(nodeNew);
      if (!nodeSave) {
        const str = `Hubo un problema al crear la zona con el el name: ${name}`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }
      console.log(`Zona/Nodo creada exitosamente.\n------------------------------------------------\n`);
      return nodeSave;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////

  /**
   * Busca todas la entradas asociadas.
   * @returns { Array }
   */
  async FindAllNodes() {
    try {
      console.log(`Buscando todas las ZonaClientes/Nodos.`);
      const zonasNodos = await this.nodeRepository.find({ relations: ['systems'] });
      
      if(zonasNodos?.length < 1) {
        const str = `No se encontraron Zonas/Nodos en la tabla.`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        return str;
      }

      console.log(`${zonasNodos?.length} Zonas/nodos encontradas.\n------------------------------------------------\n`);
    return zonasNodos;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////

  /**
   * Encuentra una entrada a partir del id.
   * @param id { number }
   * @returns { object }
   */
  async FindOneNode(id: number) {
    try {
      console.log(`Buscando una ZonaCliente/Nodo con el id: ${id}`);

      const nodo = await this.nodeRepository.findOne({
        where: { id: id },
        relations: ['systems'],
      });

      if (!nodo ) {
        const str = `No se encontraron Zonas/Nodos con el id: ${id}.`;
          console.log(
            `${str}\n------------------------------------------------\n`,
          );
          return str;
      }

      console.log(`ZonaCLiente/Nodo encontrado`);
      console.log(`------------------------------------------------\n`);

      return nodo;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////

  /**
   * Metodo para hacer update a las entradas de la tabla.
   * Si name y system llegan vacios la solicitud se rechaza.
   * @param id { number }
   * @param updateNodeDto { UpdateNodeDto } 
   * @returns { object }
   */
  async UpdateNode(id: number, updateNodeDto: UpdateNodeDto) {
    const { name, systems } = updateNodeDto;

    if (!name && !systems) {
      const str = `No hay valores para realizar updates.`;
          console.log(
            `${str}\n------------------------------------------------\n`,
          );
          return str;
    }

    try {
      console.log(`Haciendo update al ZonaCliente/Nodo con id: ${id}`);
      const zoneToUpdate = await this.nodeRepository.findOneBy({ id });
      if (!zoneToUpdate) {
        const str = `No se encontraron Zonas/Nodos con el id: ${id}.`;
          console.log(
            `${str}\n------------------------------------------------\n`,
          );
          return str;
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
          return str;
      }

      console.log(`Update realizado exitosamente.`);
      console.log(`------------------------------------------------\n`);
      return saveUpdate;

    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  //////////////////////////////////////////////////////////////////////

  /**
   * Metodo para remover una entrada de la tabla mediante el id.
   * @param id { number }
   * @returns { object }
   */
  async RemoveNode(id: number) {
    try {
      console.log(`Eliminando ZonaCliente/Nodo con id: ${id}`);

      const del = await this.nodeRepository.delete(id);
      
      if (!del) {
        const str = `No se pudo eliminar la ZonaCliente/Nodo.`;
          console.log(
            `${str}\n------------------------------------------------\n`,
          );
          return str;
      }

      console.log(`Entrada eliminada exitosamente`);
      console.log(`------------------------------------------------\n`);

      return del;
    }
    catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
