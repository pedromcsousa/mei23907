export class NewLorawanDataEvent {
  constructor(public readonly devEUI: string, public readonly data: any) {}
}
