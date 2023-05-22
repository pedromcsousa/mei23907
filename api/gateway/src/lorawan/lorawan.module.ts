import { Module } from '@nestjs/common';
import { LorawanController } from './lorawan.controller';
import { LorawanService } from './lorawan.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'LORAWAN',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [LorawanController],
  providers: [LorawanService],
})
export class LorawanModule {}
