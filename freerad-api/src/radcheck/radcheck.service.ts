import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RadCheck } from 'src/database/radcheck.entity';
import { RadCheckUpdateDto } from 'src/dto/radcheck.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RadcheckService {
  constructor(
    @InjectRepository(RadCheck)
    private radcheckRepository: Repository<RadCheck>,
  ) {}

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async GetAllRadCheck() {
    try {
      const allRadChecks = await this.radcheckRepository.find();

      console.log(allRadChecks);
      if (allRadChecks?.length < 1) {
        return 'no radcheck';
      }

      return allRadChecks;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async GetById(id: number) {
    try {
      const rad = await this.radcheckRepository.findOneBy({ id: id });

      if (!rad) {
        console.log(`No hay datos con el id: ${id}`);
        console.log(`------------------------------------------------\n`);
        return `No hay datos con el id: ${id}`;
      }

      return rad;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async CreateRadCheck(data: any) {
    const { username, attribute, op, value } = data;

    try {
      console.log(`Creado rad para username: ${username}`);

      const isRad = await this.radcheckRepository.findOneBy({
        username: username,
      });

      if (isRad) {
        console.log(`Ya existe un rad con el username: ${username}`);
        console.log(`------------------------------------------------\n`);
        return `Ya existe un rad con el username: ${username}`;
      }

      const newRad = await this.radcheckRepository.create({
        username,
        attribute: attribute ? attribute : 'Cleartext-Password',
        op: op ? op : ':=',
        value,
      });

      const saveRad = await this.radcheckRepository.save(newRad);

      if (!saveRad) {
        console.log(
          `Surgio un problema al guardar lo datos con el username: ${username}`,
        );
        console.log(`------------------------------------------------\n`);
        return `Surgio un problema al guardar lo datos con el username: ${username}`;
      }

      return saveRad;
    } catch (error) {
      return error;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  async UpdateRadCheck(id: number, data: RadCheckUpdateDto) {
    const { username, attribute, op, value } = data;

    try {
      console.log(`Haciendo update del rad ${username}`);

      const rad = await this.radcheckRepository.findOneBy({
        id: id,
      });

      if (!rad) {
        console.log(`No hay datos con el id: ${id}`);
        console.log(`------------------------------------------------\n`);
        return `No hay datos con el id: ${id}`;
      }

      rad.username = username ? username : rad.username;
      rad.attribute = attribute ? attribute : rad.attribute;
      rad.op = op ? op : rad.op;
      rad.value = value ? value : rad.value;

      const updateRad = await this.radcheckRepository.save(rad);

      if (!updateRad) {
        console.log(`No se puedo realizar el update del rad: ${username}`);
        console.log(`------------------------------------------------\n`);
        return `No se puedo realizar el update del rad: ${username}`;
      }

      return updateRad;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      return error;
    }
  }
}
