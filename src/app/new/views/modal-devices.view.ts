import {AbstractModal} from '../common/abstract-modal';
import {DevicesObserver} from '../common/devices.observer';
import {Device, DevicesController} from '../controllers/devices.controller';

export class ModalDevicesView extends AbstractModal implements DevicesObserver {
  public selectors: HTMLSelectElement;

  public controllers: HTMLSelectElement;

  private noSelector: HTMLSpanElement;

  private noController: HTMLSpanElement;

  constructor() {
    super('#devices');
    this.selectors = this.node.querySelector('[title=selectors-options]');
    this.controllers = this.node.querySelector('[title=controllers-options]');

    this.noSelector = this.node.querySelector('.no-selector');
    this.noController = this.node.querySelector('.no-controller');

    this.initialize();
  }

  public onNewConnectedSelectors(selectors: DevicesController['connectedSelectors']): void {
    this.renderSelectors(selectors);
  }

  public onNewConnectedControllers(controllers: DevicesController['connectedControllers']): void {
    this.renderControllers(controllers);
  }

  public onNewActiveSelector(selector: DevicesController['activeSelector']): void {
    this.renderActiveSelector(selector);
  }

  public onNewActiveController(controller: DevicesController['activeController']): void {
    this.renderActiveController(controller);
  }

  private initialize() {
    this.selectors.appendChild(this.createDefaultOption());
    this.controllers.appendChild(this.createDefaultOption());

    this.render();
  }

  private render() {
    this.renderSelectors([]);
    this.renderControllers([]);
  }

  private renderSelectors(selectors: Device[]) {
    if (selectors.length === 0) {
      this.hideSelectors();
      return;
    }

    this.showSelectors();

    selectors.forEach((selector) => {
      const option = this.createOption(selector);
      this.selectors.appendChild(option);
    });
  }

  private renderControllers(controllers: Device[]) {
    if (controllers.length === 0) {
      this.hideControllers();
      return;
    }

    this.showControllers();

    controllers.forEach((controller) => {
      const option = this.createOption(controller);
      this.controllers.appendChild(option);
    });
  }

  private renderActiveSelector(selector: DevicesController['activeSelector']): void {
    const options = Array.from(this.selectors.options);

    options.forEach((option) => {
      if (option.value === selector.input.name) {
        option.selected = true;
      }
    });
  }

  private renderActiveController(controller: DevicesController['activeController']): void {
    const options = Array.from(this.controllers.options);

    options.forEach((option) => {
      if (option.value === controller.input.name) {
        option.selected = true;
      }
    });
  }

  private hideSelectors() {
    this.selectors.style.display = 'none';
    this.noSelector.style.display = 'flex';
  }

  private showSelectors() {
    this.noSelector.style.display = 'none';
    this.selectors.style.display = 'flex';
  }

  private hideControllers() {
    this.controllers.style.display = 'none';
    this.noController.style.display = 'flex';
  }

  private showControllers() {
    this.noController.style.display = 'none';
    this.controllers.style.display = 'flex';
  }

  private createOption(device: Device) {
    const option = document.createElement('option');
    option.textContent = device.input.name;
    return option;
  }

  private createDefaultOption() {
    const option = document.createElement('option');
    option.textContent = 'Select device';
    option.disabled = true;
    option.selected = true;
    return option;
  }
}
