import {AbstractDevice} from './abstract.device';
import {Device} from '../controllers/devices.controller';

export class Controller extends AbstractDevice {
  constructor(device: Device) {
    super(device);
    this.boot();
  }
}
