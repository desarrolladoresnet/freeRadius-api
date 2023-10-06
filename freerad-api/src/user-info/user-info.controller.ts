import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoDto, UserUpdateDto } from 'src/dto/index';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller principal relativo a los usuarios de los servicios de NetcomPlus.
 * Los usuarios son manipulados para lograr efecto en 'Radius' y el router que este controla.
 * La ruta principal para este controller es http://<domain>/user-info/<params (si la hay)>
 */
@Controller('user-info')
@UseGuards(AuthGuard('jwt'))
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}

  /**
   * Permite crear un nuevo usuario.
   * La tabla 'userinfo' de Radius contiene muchos campos, no todos son utilizados en este momento por Netcomplus,
   * ni todos son usados directamente como lo sugieren los campos. Remitase al UserInfoDto o UserEntity
   * para ver los campos necesarios y los opcionales.
   * @param data { UserInfoDto }
   * @returns { Userinfo }
   */
  @Post()
  createUser(@Body() data: UserInfoDto) {
    return this.userInfoService.CreateUser(data);
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
   * Obtiene el total de todos los servicios asociados a la tabla 'userinfo'
   * @returns { UserInfo[] }
   */
  @Post('getusers/total')
  getTotalEntries(@Body() data: { firstname?: string; entry?: string }) {
    return this.userInfoService.GetTotalEntries(data);
  }

  /**
   * Obtiene todos los servicios asociados a la tabla 'userinfo'
   * @returns { UserInfo[] }
   */
  @Post('getusers/:n/:t')
  findAllUser(
    @Param('n') n: number,
    @Param('t') t: number,
    @Body()
    data: { firstname?: string; entry?: string },
  ) {
    return this.userInfoService.FindAllUsers(n, t, data);
  }

  /**
   * Permite modificar un usuario.
   * @param id
   * @param data
   * @returns { Userinfo }
   */
  @Put('update/:id')
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
