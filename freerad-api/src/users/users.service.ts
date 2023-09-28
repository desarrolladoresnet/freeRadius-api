import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { SingUserDto, UserDto } from 'src/dto/user.dto';
import { Repository } from 'typeorm';
import * as argon from 'argon2';

// This should be a real class/interface representing a user entity

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

    if (isUser) return 'El usuario existe';

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
      return error;
    }
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////

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
}
