import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reading, ReadingTypes } from './schema/reading.schema';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading.name) private readingModel: Model<Reading>,
  ) {}

  async getAll(): Promise<Array<Reading>> {
    return this.readingModel.find().populate('device');
  }

  async add(
    device: string,
    latitude: number,
    longitude: number,
    altitude?: number,
  ): Promise<Reading> {
    const newReading = new this.readingModel();
    newReading.latitude = latitude;
    newReading.longitude = longitude;
    newReading.altitude = altitude || 0;
    newReading.device = new Types.ObjectId(device);
    return newReading.save();
  }
}
