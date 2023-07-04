import { Injectable } from '@nestjs/common';
import { INewReadingDataEvent } from './event/new-reading';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async newData(devEUI: string, newData: INewReadingDataEvent) {
    return (
      await this.httpService.axiosRef.post(
        process.env.GATEWAY + `/device/${devEUI}/reading`,
        {
          ...newData,
        },
      )
    ).data;
  }
}
