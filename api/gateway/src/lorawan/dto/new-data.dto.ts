import {
  IsDateString,
  IsDefined,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class DeviceInfo {
  @IsString()
  tenantId: string;

  @IsString()
  tenantName: string;

  @IsString()
  applicationId: string;

  @IsString()
  applicationName: string;

  @IsString()
  deviceProfileId: string;

  @IsString()
  deviceProfileName: string;

  @IsString()
  deviceName: string;

  @IsDefined()
  @IsString()
  devEUI: string;

  @IsDefined()
  @IsString()
  tags: any;
}

class RXInfo {
  @IsDefined()
  @IsString()
  gatewayId: string;

  @IsNumber()
  uplinkId: number;

  @IsNumber()
  rssi: number;

  @IsNumber()
  snr: number;

  @IsString()
  context: string;

  metadata: any;
}

class TXInfo {
  @IsNumber()
  frequency: number;

  modulation: any;
}

export class NewLoRaWANDataDTO {
  @IsString()
  deduplicationId: string;

  @IsDefined()
  @IsDateString()
  time: Date;

  @ValidateNested()
  deviceInfo: DeviceInfo;

  @IsDefined()
  @IsString()
  devAddr: string;

  @IsNumber()
  dr: number;

  @IsNumber()
  fPort: number;

  @ValidateNested()
  rxInfo: Array<RXInfo>;

  @ValidateNested()
  txInfo: TXInfo;
}
