import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Device, DeviceTypes } from './schema/device.schema';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private deviceModel: Model<Device>) {}

  async getAll(): Promise<Array<Device>> {
    return this.deviceModel.find().populate('user');
  }

  async add(tag: string, type: DeviceTypes, user?: string): Promise<Device> {
    const newDevice = new this.deviceModel();
    newDevice.tag = tag;
    newDevice.type = type;
    newDevice.user = new Types.ObjectId(user);
    return newDevice.save();
  }
}
