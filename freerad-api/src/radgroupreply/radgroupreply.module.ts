import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadGroupReplyController } from './radgroupreply.controller';
import { RadGroupReplyService } from './radgroupreply.service';
import { RadGroupReply } from 'src/database/entities/index';

@Module({
  imports: [TypeOrmModule.forFeature([RadGroupReply])],
  controllers: [RadGroupReplyController],
  providers: [RadGroupReplyService],
  exports: [RadGroupReplyService],
})
export class RadGroupReplyModule {}
