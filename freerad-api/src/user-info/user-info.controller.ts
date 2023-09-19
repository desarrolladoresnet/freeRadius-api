import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserDto } from 'src/dto/user.dto';
import { UserUpdateDto } from 'src/dto/userUpdate.dto';

/**
 * Controller principal relativo a los usuarios de los servicios de NetcomPlus.
 * Los usuarios son manipulados para lograr efecto en 'Radius' y el router que este controla.
 * La ruta principal para este controller es http://<domain>/user-info/<params (si la hay)>
 */
@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  /**
   * Permite crear un nuevo usuario.
   * La tabla 'userinfo' de Radius contiene muchos campos, no todos son utilizados en este momento por Netcomplus,
   * ni todos son usados directamente como lo sugieren los campos. Remitase al UserDto o UserEntity
   * para ver los campos necesarios y los opcionales.
   * @param data { userDto }
   * @returns { Userinfo }
   */
  @Post()
  createUser(@Body() data: UserDto) {
    return this.userInfoService.CreateUser(data);
  }

  /**
   * Obtiene todos los servicios asociados a la tabla 'userinfo'
   * @returns { UserInfo[] }
   */
  @Get('getusers/total')
  getTotalEntries() {
    return this.userInfoService.GetTotalEntries();
  }

  /**
   * Obtiene todos los servicios asociados a la tabla 'userinfo'
   * @returns { UserInfo[] }
   */
  @Get('getusers/:n/:t')
  findAllUser(@Param('n') n: number, @Param('t') t: number) {
    return this.userInfoService.FindAllUsers(n, t);
  }

  /**
   * Permite buscar un usuario en base a su id
   * @param id { number }
   * @returns { UserInfo }
   */
  @Get(':id')
  findById(@Param('id') id: number) {
    return this.userInfoService.FindById(id);
  }

  /**
   * Permite buscar un usuario en base a su id
   * @param id { number }
   * @returns { UserInfo }
   */
  @Get('username/:username')
  usernameInUse(@Param('username') username: string) {
    return this.userInfoService.UsernameInUse(username);
  }

  /**
   * Permite buscar un usuario en base a su id
   * @param id { number }
   * @returns { UserInfo }
   */
  @Get('find-usernames/:username')
  findUsernames(@Param('username') username: string) {
    return this.userInfoService.FindUsernames(username);
  }

  /**
   * Permite modificar un usuario.
   * @param id
   * @param data
   * @returns { Userinfo }
   */
  @Put(':id')
  updateUserInfo(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.userInfoService.UpdateUserInfo(id, data);
  }

  /**
   * Función opuesta a createUser.
   * Birra a un usuario de las tres tablas dónde está reegistrado.
   * @param username
   * @returns { string }
   */
  @Delete(':username')
  deleteByUsername(@Param('username') username: string) {
    return this.userInfoService.DeleteByUsername(username);
  }
}
