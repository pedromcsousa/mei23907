import { Module } from '@nestjs/common';
import { LorawanController } from './lorawan.controller';
import { LorawanService } from './lorawan.service';

@Module({
  controllers: [LorawanController],
  providers: [LorawanService]
})
export class LorawanModule {}
