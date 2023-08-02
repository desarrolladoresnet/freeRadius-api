import { Injectable } from '@nestjs/common';
import { CreateNasDto } from './dto/create-nas.dto';
import { UpdateNasDto } from './dto/update-nas.dto';
import { Nas } from './entities/nas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NasService {constructor(
  @InjectRepository(Nas)
  private nasRepository: Repository<Nas>,
) {}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

async CreateNas(data: CreateNasDto) {
  try {
    const { name, ip_address, secret } = data;

    console.log(`Creando NAS`);
    const isNas = await this.nasRepository.findBy({
      nasname: ip_address,
    });

    if (isNas?.length > 0) {
      console.log(`Ya existe un NAS con ese IP: ${ip_address}`);
      return isNas;
    }

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

    if (!nas) {
      console.log(`Hubo un error al guardar los datos`);
    }

    console.log(`------------------------------------------------\n`);
    return nas;
  } catch (error) {
    console.error(error);
    console.log(`------------------------------------------------\n`);
    return error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

async FindAllNas() {
  try {
    console.log(`Buscandos NAS`);
    const allNas = await this.nasRepository.find();

    if (allNas?.length < 1) {
      console.log(`No se encontraron Nas`);
      return 'no se encontro nas';
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

async FindById(id: number) {
  try {
    const nas = await this.nasRepository.findOneBy({ id: id });

    console.log(`Buscandos NAS con el id: ${id}`);
    if (!nas) {
      console.log(`No se encontro un nas con el id: ${id}`);
      return `No se encontro un nas con el id: ${id}`;
    }

    console.log(`------------------------------------------------\n`);
    return nas;
  } catch (error) {
    console.error(error);
    console.log(`------------------------------------------------\n`);
    return error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

async UpdateNas(id: number, data: CreateNasDto) {
  try {
    const nas = await this.nasRepository.findOneBy({ id: id });

    console.log(`Creando NAS`);

    if (!nas) {
      console.log(`No se encontro un nas con el id: ${id}`);
      return `No se encontro un nas con el id: ${id}`;
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

    if (!updateNas) {
      console.log(`No se puedo actualizar el NAS`);
      return 'No de pudo actualizar el NAS';
    }

    console.log(`------------------------------------------------\n`);
    return updateNas;
  } catch (error) {
    console.error(error);
    console.log(`------------------------------------------------\n`);
    return error;
  }
}
}
