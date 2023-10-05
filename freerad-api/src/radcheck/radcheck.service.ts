import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RadCheck } from 'src/database/entities/index';
import { RadCheckDto, RadCheckUpdateDto } from 'src/dto/index';

/**
 * Metodos para la manipulacion de la tabla "radcheck".
 */
@Injectable()
export class RadcheckService {
  constructor(
    @InjectRepository(RadCheck)
    private radcheckRepository: Repository<RadCheck>,
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Retorna toda las entradas de la tabla radcheck.
   * @todo paginar
   * @returns { array }
   */
  async GetAllRadCheck() {
    try {
      const date = new Date();
      console.log(
        `Buscando entradas en la tabla "radcheck"'.\nFecha: ${date}\n`,
      );
      const allRadChecks = await this.radcheckRepository.find();

      console.log(allRadChecks);
      if (allRadChecks?.length < 1) {
        const str = `No se han encontrado entradas en la tabla "radcheck"`;
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
      const str = `Entradas encontradas`;
      console.log(`${str}\n------------------------------------------------\n`);
      return allRadChecks;
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
   * Busca una entrada por medio del id.
   * @param id { number } debe ser int.
   * @returns { object }
   */
  async GetById(id: number) {
    try {
      const date = new Date();
      console.log(`Buscando entrada con el id: ${id}.\nFecha: ${date}\n`);
      const rad = await this.radcheckRepository.findOneBy({ id: id });

      if (!rad) {
        const str = `No hay datos con el id: ${id}`;
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
        `Enviado entrada.\n------------------------------------------------\n`,
      );
      return rad;
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
   * Busca una entrada por medio del id.
   * @param id { number } debe ser int.
   * @returns { object }
   */
  async GetByName(username: string) {
    try {
      const date = new Date();
      console.log(
        `Buscando entrada con el username: ${username}.\nFecha: ${date}\n`,
      );
      const rad = await this.radcheckRepository.findOneBy({
        username: username,
      });

      if (!rad) {
        const str = `No hay datos con el username: ${username}`;
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
        `Enviado entrada.\n------------------------------------------------\n`,
      );
      return rad;
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
   * Permite crear una entrada en la tabla.
   * En general este proceso es realizado cuando se crea un nuevo usuario en "userinfo", pero puede ser util en casos donde se cree la entrada de "userinfo" pero falle en "radcheck".
   * Se requiere "username" de manera obligatoria, los otros parametros pueden ser enviados, sino se aplican el resto por defecto.
   * @param data { RadCheckDto }
   * @returns { object }
   */
  async CreateRadCheck(data: RadCheckDto) {
    const { username, attribute, op, value } = data;

    try {
      const date = new Date();
      console.log(`Creando rad para username: ${username}.\nFecha: ${date}\n`);

      const isRad = await this.radcheckRepository.findOneBy({
        username: username,
      });

      if (isRad) {
        const str = `Ya existe un rad con el username: ${username}`;
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

      const newRad = this.radcheckRepository.create({
        username,
        attribute: attribute ? attribute : 'Cleartext-Password',
        op: op ? op : ':=',
        value,
      });
      const saveRad = await this.radcheckRepository.save(newRad);

      if (!saveRad) {
        const str = `Hubo un problema al guardar lo datos con el username: ${username}`;
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

      console.log(`radcheck creado exitosamente`);
      return saveRad;
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
   * Metodo para update de la tabla "radcheck"
   * Se necesita enviar el id y al menos un valor a modificar que no sea el "username", de lo contrario la operacion es abortada.
   * @param id { number }
   * @param data { RadCheckUpdateDto }
   * @returns { object }
   */
  async UpdateRadCheck(id: number, data: RadCheckUpdateDto) {
    const { attribute, op, value } = data;

    //* Verifica que haya valores para modificar *//
    if (!attribute && !op && !value) {
      const date = new Date();
      const str = `No se enviaron atributos para modificar.\n attributre: ${attribute}, op: ${op}, value:${value}.`;
      console.log(
        `${str}\n------------------------------------------------\n\nFecha: ${date}\n`,
      );
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
      console.log(`Haciendo update del rad ${id}`);
      //* Busqueda de la entada *//
      const rad = await this.radcheckRepository.findOneBy({
        id: id,
      });
      if (!rad) {
        const str = `No hay datos con el id: ${id}`;
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

      //* Actualizacion de valores *//
      // rad.username = username ? username : rad.username; // -> Desechado: no se debiera modificar el username.
      rad.attribute = attribute ? attribute : rad.attribute;
      rad.op = op ? op : rad.op;
      rad.value = value ? value : rad.value;

      const updateRad = await this.radcheckRepository.save(rad);

      //* Verificando update *//
      if (!updateRad) {
        const str = `No se puedo realizar el update del rad: ${updateRad.username}`;
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
        `El user ${updateRad.username} fue actualizado exitosamente.\n------------------------------------------------\n`,
      );
      return updateRad;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
