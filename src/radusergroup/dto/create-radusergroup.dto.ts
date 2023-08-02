import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRadusergroupDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    groupname: string;
  
    @IsOptional()
    @IsNumber()
    priority: number;
}
