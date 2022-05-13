import {Input, Output, WebMidi} from 'webmidi';
import {knownDevices} from '../../devices/known-devices/known-devices';
import {
  ControllerSettings,
  DeviceCategory,
  SelectorSettings,
} from '../../devices/device/device.types';
import {Selector} from '../devices/selector';
import {DevicesObserver} from '../common/devices.observer';
import {Controller} from '../devices/controller';

export interface Device {
  input: Input;
  output: Output;
  settings: SelectorSettings | ControllerSettings;
}

export class DevicesController {
  private midi = WebMidi;

  private knownDevices = knownDevices;

  private connectedInputs: Omit<Device, 'output'>[] = [];

  private connectedOutputs: Omit<Device, 'input'>[] = [];

  private connectedSelectors: Device[] = [];

  private connectedControllers: Device[] = [];

  private activeSelector: Selector;

  private activeController: Device;

  private observers: DevicesObserver[] = [];

  constructor() {
    this.midi.enable({
      sysex: true,
    })
      .then(async () => {
        this.addDevices();
        this.watchDevices();
      });
  }

  public addObserver(observer: DevicesObserver): void {
    this.observers.push(observer);
  }

  public addSelector(name: string): void {
    const selector = this.connectedSelectors.find((s) => s.input.name === name);

    if (!selector) {
      return;
    }

    this.activeSelector = new Selector(selector);
    this.notifyNewActiveSelector();
  }

  public addController(name: string): void {
    const controller = this.connectedControllers.find((c) => c.input.name === name);

    if (!controller) {
      return;
    }

    this.activeController = new Controller(controller);
    this.notifyNewActiveController();
  }

  private findSettings(device: Input | Output) {
    const matches = this.knownDevices.filter((settings) => {
      const isKnownManufacturer = settings.manufacturer === device.manufacturer;
      const isKnownName = device.name.includes(settings.name);

      return isKnownManufacturer && isKnownName;
    });

    if (matches.length === 0) {
      return;
    }

    return matches[0];
  }

  private addDevices() {
    this.addInputs();
    this.addOutputs();
    this.addDevice();
  }

  private watchDevices() {
    this.watchConnects();
    this.watchDisconnects();
  }

  private notifyNewConnectedSelectors() {
    this.observers.forEach((observer) => {
      observer.onNewConnectedSelectors(this.connectedSelectors);
    });
  }

  private notifyNewConnectedControllers() {
    this.observers.forEach((observer) => {
      observer.onNewConnectedControllers(this.connectedControllers);
    });
  }

  private notifyNewActiveSelector() {
    this.observers.forEach((observer) => {
      observer.onNewActiveSelector(this.activeSelector);
    });
  }

  private notifyNewActiveController() {
    this.observers.forEach((observer) => {
      observer.onNewActiveController(this.activeController);
    });
  }

  private addInputs() {
    this.midi.inputs.forEach((input) => {
      const isUniqueName = this.connectedInputs.every((device) => device.input.name !== input.name);

      if (!isUniqueName) {
        return;
      }

      const settings = this.findSettings(input);

      if (!settings) {
        return;
      }

      const enrichedInput = {
        input,
        settings,
      };

      this.connectedInputs.push(enrichedInput);
    });
  }

  private addOutputs() {
    this.midi.outputs.forEach((output) => {
      const settings = this.findSettings(output);

      if (!settings) {
        return;
      }

      const enrichedOutput = {
        output,
        settings,
      };

      this.connectedOutputs.push(enrichedOutput);
    });
  }

  private addDevice() {
    this.connectedInputs.forEach(({input}) => {
      const match = this.connectedOutputs.find(({output}) => output.name === input.name);

      if (!match) {
        return;
      }

      const device = {
        input,
        output: match.output,
        settings: match.settings,
      };

      if (device.settings.category === DeviceCategory.selector) {
        this.connectedSelectors.push(device);
        this.notifyNewConnectedSelectors();
      }
      else if (device.settings.category === DeviceCategory.controller) {
        this.connectedControllers.push(device);
        this.notifyNewConnectedControllers();
      }
    });
  }

  private watchConnects() {
    this.midi.addListener('connected', (e) => {
      if (e.port instanceof Input) {
        this.addInputs();
      }
      else if (e.port instanceof Output) {
        this.addOutputs();
      }

      this.addDevice();
    });
  }

  private watchDisconnects() {
    this.midi.addListener('disconnected', (e) => {
      const name = e.port.name;

      if (e.port instanceof Input) {
        this.removeInput(name);
      }
      else if (e.port instanceof Output) {
        this.removeOutput(name);
      }

      this.removeDevice(name);
    });
  }

  private removeInput(name: string) {
    if (this.activeSelector && this.activeSelector.input.name === name) {
      this.activeSelector = null;
    }

    this.connectedInputs.forEach((input) => {
      if (input.input.name === name) {
        this.connectedInputs.splice(this.connectedInputs.indexOf(input), 1);
      }
    });
  }

  private removeOutput(name: string) {
    if (this.activeSelector && this.activeSelector.output.name === name) {
      this.activeSelector = null;
    }

    this.connectedOutputs.forEach((output) => {
      if (output.output.name === name) {
        this.connectedOutputs.splice(this.connectedOutputs.indexOf(output), 1);
      }
    });
  }

  private removeDevice(name: string) {
    this.connectedSelectors.forEach((selector) => {
      if (selector.input.name === name && selector.output.name === name) {
        this.connectedSelectors.splice(this.connectedSelectors.indexOf(selector), 1);
      }
    });

    this.connectedControllers.forEach((controller) => {
      if (controller.input.name === name && controller.output.name === name) {
        this.connectedControllers.splice(this.connectedControllers.indexOf(controller), 1);
      }
    });
  }
}
