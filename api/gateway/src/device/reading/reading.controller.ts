import { Controller } from '@nestjs/common';
import { NewReadingExtendDTO } from './dto/new.dto';
import { ReadingService } from './reading.service';
import { EventPattern } from '@nestjs/microservices';
import { NewReadingDataEvent } from './event/new-reading';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @EventPattern('new_reading')
  handleNewData(data: NewReadingDataEvent) {
    return this.readingService.add(
      data.devEUI,
      data.latitude,
      data.longitude,
      data.altitude,
    );
  }
}
