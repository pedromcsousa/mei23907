import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReadingService } from './reading.service';
import NewReadingDTO from './dto/new.dto';

@Controller('device/:tag/reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post()
  handleNewData(@Param('tag') deviceTag: string, @Body() data: any) {
    console.log('11 - API Received', deviceTag, data);
    return this.readingService.add(
      deviceTag,
      data.latitude,
      data.longitude,
      data.altitude,
      data.battery,
    );
  }
}
