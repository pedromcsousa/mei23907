import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NewLorawanDataEvent } from './event/new-data.event';
import { NewReadingDataEvent } from './event/new-reading';

@Injectable()
export class AppService {
  constructor(@Inject('READING') private readonly readingClient: ClientProxy) {}

  newData(newData: NewReadingDataEvent) {
    console.log(newData);
    this.readingClient.emit(
      'new_reading',
      new NewReadingDataEvent(
        newData.devEUI,
        newData.longitude,
        newData.latitude,
        newData.altitude,
      ),
    );
  }

  async add(data: NewLorawanDataEvent) {
    return this.newData({
      ...data,
      longitude: 0,
      latitude: 0,
      altitude: 0,
    });
  }
}
