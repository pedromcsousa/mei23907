import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { NewLorawanDataEvent } from './event/new-data.event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('new_data')
  handleNewData(data: NewLorawanDataEvent) {
    console.log(data.data);
  }
}
