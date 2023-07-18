import { Transform } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';

export default class NewReadingDTO {
  @IsDefined()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude: number;

  @IsDefined()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  altitude: number;

  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  battery?: number;
}
