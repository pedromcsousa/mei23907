import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { NewLoRaWANDataDTO } from './dto/new-data.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  newData(@Body() data: NewLoRaWANDataDTO) {
    return this.appService.newData(
      data.end_device_ids.dev_eui,
      data.uplink_message.decoded_payload,
    );
  }
}
