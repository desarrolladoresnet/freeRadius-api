/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanDto } from '../dto/plan.dto';
// import { UpdatePlanDto } from 'src/dto/update-plan.dto';
import { UpdatePlanDto } from '../dto/plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from '../database/plan.entity';

/**
 * Metodos para la manipulacion de los planes.
 */
@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}
  private readonly plans: Plan[] = [];

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Recibe dos parametros en forma de String, name: Que sería el nomabre comercial y listname: El nombre en lista.
   * @param data { createPlanDto }
   * @returns { object }
   */
  async CreatePlan(plan: CreatePlanDto) {
    const { name, listName } = plan;
    try {
      console.log(
        `Creado nuevo plan con name:'${name}' y listName:'${listName}'`,
      );

      //* Verificacion de existencia del plan *//
      const isName = await this.planRepository.find({
        where: [{ name }, { listName }],
      });
      if (isName?.length > 0) {
        const str = `Ya existe un plan con el name:'${name}' o listName:'${listName}'`;
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

      //* Si el plan no existe se crea *//
      const planNew = await this.planRepository.create({
        name,
        listName,
      });
      const planSave = await this.planRepository.save(planNew);

      //* Se verifica que el plan se haya guardado correctamente *//
      if (!planSave) {
        const str = `Hubo un error al guardar el plan con el name:'${name}' o listName:'${listName}'`;
        console.log(
          `${str}\n------------------------------------------------\n`,
        );
        console.log(
          `Plan guardado exitopsamente.\n------------------------------------------------\n`,
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
      return planSave;
    } catch (error) {
      console.log(error);
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Trae todo los planes
   * @todo Paginar
   * @returns { Array }
   */
  async FindAllPlans() {
    try {
      console.log(`Buscando los planes`);
      const planes = await this.planRepository.find();
      if (planes?.length < 1) {
        const str = `No se encontraron planes`;
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
      console.log(
        `${planes?.length} planes encontrados.\n------------------------------------------------\n`,
      );
      return planes;
    } catch (error) {
      console.log(error);
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Trae una entrada en base al id del plan buscado.
   * @param id { number }
   * @returns { object }
   */
  async FindOnePlan(id: number) {
    try {
      console.log(`Buscando plan con el id: ${id}`);
      const plan = await this.planRepository.findOneBy({ id });

      if (!plan) {
        const str = `No se encontró un plan con el id: ${id}`;
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

      console.log(
        `Plan econtrado\n------------------------------------------------\n`,
      );
      return plan;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite actualizar una entrada en base al id y los parametros enviados.
   * @param id { number }
   * @param data { UpdatePlanDto }
   */
  async UpdatePlan(id: number, updatePlanDto: UpdatePlanDto) {
    try {
      console.log(`Haciendo update al plan con el id: ${id}`);

      const { name, listName } = updatePlanDto;

      //* Verificacion de existencia del plan *//
      const isName = await this.planRepository.find({
        where: [{ name }, { listName }],
      });
      if (isName?.length > 0) {
        const str = `Ya existe un plan con el name:'${name}' o listName:'${listName}'`;
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

      //* Update del plan *//
      const update = await this.planRepository.update(id, updatePlanDto);

      if (!update) {
        const str = `Hubo un problema al realizar el update`;
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

      console.log(`Update exitoso`);
      return update;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  /**
   * Permite eliminar una entrada en base al id.
   * @param id { number }
   * @returns { object }
   */
  async RemovePlan(id: number) {
    try {
      console.log(`Borrando plan con el id: ${id}`);
      const del = await this.planRepository.delete(id);

      if (!del) {
        const str = `No se puedo eliminar el plan`;
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

      console.log(`Plan eliminado exitosamente`);
      return del;
    } catch (error) {
      console.error(error);
      console.log(`------------------------------------------------\n`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
