import { ILocation } from "./Location";

export interface IReading extends ILocation {
  _id: string;
  device: string;
  battery?: number;
}
