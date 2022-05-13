import {DevicesController} from '../controllers/devices.controller';

export interface DevicesObserver {
  onNewConnectedSelectors(selectors: DevicesController['connectedSelectors']): void;

  onNewConnectedControllers(controllers: DevicesController['connectedControllers']): void;

  onNewActiveSelector(selector: DevicesController['activeSelector']): void;

  onNewActiveController(controller: DevicesController['activeController']): void;
}
