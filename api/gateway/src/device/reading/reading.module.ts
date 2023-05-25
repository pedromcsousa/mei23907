import { Module } from '@nestjs/common';
import { ReadingController } from './reading.controller';
import { ReadingService } from './reading.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reading, ReadingSchema } from './schema/reading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reading.name, schema: ReadingSchema }]),
  ],
  controllers: [ReadingController],
  providers: [ReadingService],
})
export class ReadingModule {}
