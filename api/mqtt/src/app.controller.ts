import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { NewMqttData } from './event/new-mqtt';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('new_mqtt_data')
  handleNewData(data: NewMqttData) {
    //Utilizou-se o equipamento https://en.iotvega.com/product/nb13 como referência
    //De notar que o mesmo não envia a localização.
    //Vamos supor que utiliza Modbus para o fazer
    const payload = JSON.parse(data.payload);
    if (payload.Message && payload.Telemetry)
      return this.appService.newDataVega(
        payload.Message.dev,
        payload.Telemetry,
      );
  }
}
