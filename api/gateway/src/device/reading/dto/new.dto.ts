import { IsDefined, IsMongoId, IsNumber, IsOptional } from 'class-validator';

export default class NewReadingDTO {
  @IsDefined()
  @IsNumber()
  latitude: number;

  @IsDefined()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsNumber()
  altitude: number;
}

export class NewReadingExtendDTO extends NewReadingDTO {
  @IsDefined()
  @IsMongoId()
  device: string;
}
