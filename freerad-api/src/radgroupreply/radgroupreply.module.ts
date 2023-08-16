import { Module } from '@nestjs/common';
import { RadGroupReplyController } from './radgroupreply.controller';
import { RadGroupReplyService } from './radgroupreply.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RadGroupReply } from 'src/database/radgroupreply.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RadGroupReply])],
  controllers: [RadGroupReplyController],
  providers: [RadGroupReplyService],
  exports: [RadGroupReplyService],
})
export class RadGroupReplyModule {}
