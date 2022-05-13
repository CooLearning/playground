import {Device} from '../controllers/devices.controller';
import {AbstractDevice} from './abstract.device';

export class Selector extends AbstractDevice {
  constructor(device: Device) {
    super(device);
    this.boot();
  }
}
