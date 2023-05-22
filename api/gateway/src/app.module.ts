import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LorawanModule } from './lorawan/lorawan.module';

@Module({
  imports: [
    LorawanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
