import { PartialType } from '@nestjs/mapped-types';
import { CreateRadusergroupDto } from './create-radusergroup.dto';

export class UpdateRadusergroupDto extends PartialType(CreateRadusergroupDto) {}
