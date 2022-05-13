import {BUTTONS_PARENT} from '../../constants';
import {ModalDevicesView} from '../views/modal-devices.view';
import {DevicesController} from './devices.controller';

export class ModalDevicesController {
  private node: HTMLButtonElement;

  private view: ModalDevicesView;

  private devices: DevicesController;

  constructor(view: ModalDevicesView, devices: DevicesController) {
    this.view = view;
    this.devices = devices;

    this.node = BUTTONS_PARENT.querySelector('.devices');

    this.node.addEventListener('click', this.handleClick.bind(this));
    this.view.selectors.addEventListener('change', this.handleSelectorChange.bind(this));
    this.view.controllers.addEventListener('change', this.handleControllerChange.bind(this));
  }

  private handleClick() {
    this.view.show();
  }

  private handleSelectorChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.devices.addSelector(target.value);
  }

  private handleControllerChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.devices.addController(target.value);
  }
}
