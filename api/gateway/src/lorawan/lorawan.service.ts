import { Inject, Injectable } from '@nestjs/common';
import { NewLoRaWANDataDTO } from './dto/new-data.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NewLorawanDataEvent } from './event/new-data.event';

@Injectable()
export class LorawanService {
  constructor(@Inject('LORAWAN') private readonly lorawanClient: ClientProxy) {}

  newData(newData: NewLoRaWANDataDTO) {
    console.log(newData.deviceInfo.devEUI);
    this.lorawanClient.emit(
      'new_data',
      new NewLorawanDataEvent(newData.deviceInfo.devEUI, {}),
    );
  }
}
