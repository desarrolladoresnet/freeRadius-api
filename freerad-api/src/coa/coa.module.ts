import { Module } from '@nestjs/common';
import { CoaService } from './coa.service';
import { CoaController } from './coa.controller';

@Module({
  //imports: [TypeOrmModule.forFeature([UserInfo, Nas, Zone])],
  providers: [CoaService],
  controllers: [CoaController],
})
export class CoaModule {}
