import { Body, Controller, Post } from '@nestjs/common';
import { NewLoRaWANDataDTO } from './dto/new-data.dto';
import { LorawanService } from './lorawan.service';

@Controller('lorawan')
export class LorawanController {
  constructor(private readonly lorawanService: LorawanService) {}

  @Post()
  newData(@Body() newLorawanData: any) {
    return this.lorawanService.newData(newLorawanData);
  }
}
