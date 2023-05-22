import { Body, Controller, Get, Post } from '@nestjs/common';
import { DeviceService } from './device.service';
import NewDeviceDTO from './dto/new.device.dto';
import { Device } from './schema/device.schema';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  findAll(): Promise<Array<Device>> {
    return this.deviceService.getAll();
  }

  @Post()
  add(@Body() newDevice: NewDeviceDTO): Promise<Device> {
    return this.deviceService.add(
      newDevice.tag,
      newDevice.type,
      newDevice.user,
    );
  }
}
