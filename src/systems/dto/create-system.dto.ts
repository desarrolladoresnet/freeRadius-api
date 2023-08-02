import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSystemDto {
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    apiKey: string;

    @IsNotEmpty()
    @IsString()
    endPoint: string;
}
