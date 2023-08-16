import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRadGroupReplyDto {
    id: number;

    @IsString()
    @IsNotEmpty()
    groupname: string;
    
    @IsString()
    @IsNotEmpty()
    attribute: string;

    @IsString()
    @IsNotEmpty()
    op: string;
    
    @IsString()
    @IsNotEmpty()
    value: string;
}