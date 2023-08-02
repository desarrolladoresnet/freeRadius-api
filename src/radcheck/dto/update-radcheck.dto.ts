import { PartialType } from '@nestjs/mapped-types';
import { CreateRadcheckDto } from './create-radcheck.dto';

export class UpdateRadcheckDto extends PartialType(CreateRadcheckDto) {}
