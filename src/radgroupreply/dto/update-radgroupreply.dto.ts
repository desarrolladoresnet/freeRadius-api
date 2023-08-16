import { PartialType } from '@nestjs/mapped-types';
import { CreateRadGroupReplyDto } from './create-radgroupreply.dto';

export class UpdateRadGroupReplyDto extends PartialType(CreateRadGroupReplyDto) {}