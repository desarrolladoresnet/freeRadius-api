import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum UserRol {
  admin = 'admin',
  user = 'user',
  superadmin = 'superadmin',
}

export class UserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(8)
  createBy: string;

  @IsNotEmpty()
  @IsEnum(UserRol)
  rol: UserRol;
}

export class SingUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  @MinLength(8)
  password: string;
}
