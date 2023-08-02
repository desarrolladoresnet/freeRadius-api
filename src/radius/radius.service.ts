import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from 'src/userinfo/entities/userinfo.entity';
import { CreateUserinfoDto } from 'src/userinfo/dto/create-userinfo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RadiusService {
  constructor(
    @InjectRepository(UserInfo)
    private usersRepository: Repository<UserInfo>,
  ) {}

  async CreateUser(data: CreateUserinfoDto) {
    const { firstname, lastname, username, updateby, creationby } = data;

    try {
      const ifUser = await this.usersRepository.findOneBy({
        firstname: firstname,
      });

      if (ifUser) {
        return ifUser;
      }

      const newLocal = this.usersRepository.create({
        firstname: firstname,
        lastname: lastname,
        username: username,
        updateby: updateby,
        creationby: creationby,
        creationdate: new Date(),
        updatedate: new Date(),
        /* CAMPOS OPCIONALES */
        email: data?.email ? data.email : '0',
        department: data?.department ? data.department : '0',
        company: data?.company ? data.company : '0',
        workphone: data?.workphone ? data.workphone : '0',
        homephone: data?.homephone ? data.homephone : '0',
        mobilephone: data?.mobilephone ? data.mobilephone : '0',
        address: data?.address ? data.address : '0',
        city: data?.city ? data.city : '0',
        state: data?.state ? data.state : '0',
        zip: data?.zip ? data.zip : '0',
        notes: data?.notes ? data.notes : 'Sin notas',
        changeuserinfo: data?.changeuserinfo ? data.changeuserinfo : '0',
        portalloginpassword: data?.portalloginpassword
          ? data.portalloginpassword
          : '0',
        enableportallogin: data?.enableportallogin ? data.enableportallogin : 0,
      });
      const newUser = newLocal;
      console.log(newUser);
      const user = await this.usersRepository.save(newUser);

      if (!user) {
        console.log('Failed to create');
        return user;
      }

      return user;
    } catch (error) {
      return error;
    }
  }

  async FindAllUsers() {
    try {
      const users = await this.usersRepository.find();

      return users;
    } catch (error) {
      return error;
    }
  }
}