import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reading, ReadingTypes } from './schema/reading.schema';
import { DeviceService } from '../device.service';
import { SocketService } from 'src/socket/socket.service';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading.name) private readingModel: Model<Reading>,
    private readonly deviceService: DeviceService,
    private readonly socketService: SocketService,
  ) {}

  async getAll(): Promise<Array<Reading>> {
    return this.readingModel.find().populate('device');
  }

  async add(
    deviceTag: string,
    latitude: number,
    longitude: number,
    altitude?: number,
    battery?: number,
  ): Promise<Reading | null> {
    console.log(latitude);
    const newReading = new this.readingModel();
    const device = await this.deviceService.getByTag(deviceTag);
    if (!device) return null;
    const updLastLocationRes = await this.deviceService.updLastLocation(
      device._id,
      {
        latitude,
        longitude,
        altitude,
      },
    );
    if (!updLastLocationRes) return null;
    newReading.latitude = latitude;
    newReading.longitude = longitude;
    newReading.altitude = altitude || 0;
    newReading.device = new Types.ObjectId(device!!._id);
    newReading.battery = battery;
    await this.socketService.newReading(
      device._id,
      { latitude, longitude, altitude },
      battery,
    );
    return newReading.save();
  }
}
