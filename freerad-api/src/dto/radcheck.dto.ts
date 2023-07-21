/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class RadCheckDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  attribute: string;
  
  @IsOptional()
  @IsString()
  @MaxLength(2, { message: "El valor 'op' debe tener una extension de 2 carácteres"})
  @MinLength(2, { message: "El valor 'op' debe tener una extension de 2 carácteres"})
  op: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class RadCheckUpdateDto {

  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  attribute: string;
  
  @MaxLength(2, { message: "El valor 'op' debe tener una extension de 2 carácteres"})
  @MinLength(2, { message: "El valor 'op' debe tener una extension de 2 carácteres"})
  @IsOptional()
  @IsString()
  op: string;

  @IsOptional()
  @IsString()
  value: string;
}