import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateZoneDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    tlf: string;

    @IsNotEmpty()
    @IsString()
    codigo_zona: string;

	@IsNotEmpty()
    @IsNumber()
    Nas: number;

	@IsNotEmpty()
    @IsString()
    coord: string;
}
