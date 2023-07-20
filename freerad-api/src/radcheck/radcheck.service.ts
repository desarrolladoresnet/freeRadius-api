import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RadCheck } from 'src/database/radcheck.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RadcheckService {
  constructor(
    @InjectRepository(RadCheck)
    private radcheckRepository: Repository<RadCheck>,
  ) {}

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

  async CreateRadCheck(data: any) {
    const { username, attribute, op, value } = data;

    try {
      const newRad = this.radcheckRepository.create({
        username,
        attribute: attribute ? attribute : 'Cleartext-Password',
        op: op ? op : ':=',
        value,
      });

      return newRad;
    } catch (error) {
      return error;
    }
  }
}
