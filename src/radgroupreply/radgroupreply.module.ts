import { Module } from '@nestjs/common';
import { RadGroupReplyService } from './radgroupreply.service';
import { RadGroupReplyController } from './radgroupreply.controller';
import { RadGroupReply } from './entities/radgroupreply.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RadGroupReply])],
  controllers: [RadGroupReplyController],
  providers: [RadGroupReplyService],
  exports: [RadGroupReplyService]
})
export class RadGroupReplyModule {}
