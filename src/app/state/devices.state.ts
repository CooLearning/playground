import { knownDevices } from '../devices/known-devices/known-devices';
import {
  Controllers,
  Devices,
  Selectors,
} from '../devices/device/device.types';
import { devicesUi } from '../ui/devices.ui';
import { controllerDevice } from '../devices/controller.device';
import { selectorDevice } from '../devices/selector.device';

enum Errors {
  PickNotFound = 'Picked device could not be found'
}

export const devicesState = Object.create (null);

devicesState.devices = null as Devices;
devicesState.used = null as Devices;
devicesState.controllers = null as Controllers;
devicesState.selectors = null as Selectors;
devicesState.knownDevices = knownDevices;

/**
 * Initialize devices
 *
 * @param {*} ports - devices to reference
 */
devicesState.init = function (ports: any): void {
  this.devices = ports;
  this.sortDevices ();
};

/**
 * Sort devices by category
 */
devicesState.sortDevices = function (): void {
  this.setControllers ();
  this.setSelectors ();
  devicesUi.render ();
};

/**
 * Set controllers devices
 */
devicesState.setControllers = function (): void {
  this.controllers = this.pickDevicesByProperty ('isController');
};

/**
 * Set selectors devices
 */
devicesState.setSelectors = function (): void {
  this.selectors = this.pickDevicesByProperty ('isSelector');
};

/**
 * Set used devices
 */
devicesState.setUsed = function (): void {
  this.used = this.pickDevicesByProperty ('isUsed');
};

/**
 * Pick a controller by name
 *
 * @param {string} name - controller name
 * @param {boolean} [isPicked] - is controller picked
 */
devicesState.pickController = function (name: string, isPicked = true): void {
  const controllerName = Object.keys (this.controllers).filter ((n) => n === name)[0];
  if (typeof controllerName === 'undefined') {
    throw new Error (Errors.PickNotFound);
  }

  const controller = this.controllers[controllerName];
  controller.isUsed = isPicked;
  controller.input.isUsed = isPicked;
  controller.output.isUsed = isPicked;
  this.setUsed ();
  controllerDevice.init (controller);
};

/**
 * Pick a selector by name
 *
 * @param {string} name - selector name
 * @param {boolean} [isPicked] - is selector picked
 */
devicesState.pickSelector = function (name: string, isPicked = true): void {
  const selectorName = Object.keys (this.selectors).filter ((n) => n === name)[0];
  if (typeof selectorName === 'undefined') {
    throw new Error (Errors.PickNotFound);
  }

  const selector = this.selectors[selectorName];
  selector.isUsed = isPicked;
  selector.input.isUsed = isPicked;
  selector.output.isUsed = isPicked;
  this.setUsed ();
  selectorDevice.init (selector);
};

type DeviceProperty = 'isController' | 'isSelector' | 'isUsed';

/**
 * Utility function to pick devices by property
 *
 * @param {string} property - property to pick
 * @returns {*} devices for a given property
 */
devicesState.pickDevicesByProperty = function (property: DeviceProperty): any {
  return Object.keys (this.devices).reduce ((acc, name) => {
    const device = this.devices[name];
    const settings = device.input.settings || device.output.settings || null;
    if (device[property]) {
      device.name = name;
      device.settings = settings;
      device.isConnected = device.input.isConnected && device.output.isConnected;
      acc[name] = device;
    }
    return acc;
  }, {});
};

devicesState.getCounts = function () {
  return {
    controllers: Object.keys (this.controllers).length,
    selectors: Object.keys (this.selectors).length,
  };
};

devicesState.getSelectors = function () {
  return this.selectors;
};

devicesState.getControllers = function () {
  return this.controllers;
};
