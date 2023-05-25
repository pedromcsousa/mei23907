export class NewReadingDataEvent {
  constructor(
    public readonly devEUI: string,
    public readonly longitude: number,
    public readonly latitude: number,
    public readonly altitude: number,
  ) {}
}
