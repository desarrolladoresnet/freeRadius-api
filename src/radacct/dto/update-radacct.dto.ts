import { PartialType } from '@nestjs/mapped-types';
import { CreateRadacctDto } from './create-radacct.dto';

export class UpdateRadacctDto extends PartialType(CreateRadacctDto) {}
