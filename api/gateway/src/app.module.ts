import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LorawanModule } from './lorawan/lorawan.module';
import { ConfigModule } from '@nestjs/config';
import { HealthCheckModule } from './health-check/health-check.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LorawanModule,
    HealthCheckModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
