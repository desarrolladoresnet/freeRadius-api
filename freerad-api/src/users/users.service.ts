import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { User } from 'src/database/entities/index';
import { SingUserDto, UserDto } from 'src/dto/index';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async CreateUSer(user: UserDto) {
    console.log('Creando usuario');
    const { username, email, password, createBy, rol } = user;
    const date = new Date();

    const isUser = await this.userRepository.findOne({ where: { username } });

    if (isUser)
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Username en uso',
        },
        HttpStatus.CONFLICT,
        {
          cause: new Error('Username en uso'),
        },
      );

    try {
      const hash = await argon.hash(password);
      const newUser = await this.userRepository.create({
        username,
        email,
        rol,
        password: hash,
        create_by: createBy,
        create_at: date,
        update_by: createBy,
        update_at: date,
        last_login: date,
        active: true,
      });

      const isNewUser = await this.userRepository.save(newUser);
      if (!isNewUser) return 'no se pudo crear el usuario';
      delete isNewUser.password;

      return isNewUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  async singIn(data: SingUserDto) {
    const { username, password } = data;

    try {
      const date = new Date();

      const user = await this.userRepository.findOne({ where: { username } });

      if (!user) return 'No existe el usuario';

      const passwordMatch = await argon.verify(user.password, password);

      if (!passwordMatch) return 'Password errado';

      user.last_login = date;

      await this.userRepository.save(user);

      return user;
    } catch (error) {
      return error;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////

  async IsUsername(username: string) {
    try {
      const isuser = await this.userRepository.findBy({ username });

      if (isuser) return false;
      else return true;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
