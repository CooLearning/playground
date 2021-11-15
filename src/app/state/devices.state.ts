import { knownDevices } from '../devices/known-devices/known-devices';
import {
  Controllers, Controller,
  Device,
  Devices,
  Selectors, Selector,
} from '../devices/device/device.types';
import { devicesUi } from '../ui/devices.ui';
import { controllerDevice } from '../devices/controller.device';
import { selectorDevice } from '../devices/selector.device';
import { store } from '../store/store';

enum Errors {
  PickNotFound = 'Picked device could not be found'
}

export const devicesState = Object.create (null);

devicesState.devices = null as Devices;
devicesState.controllers = null as Controllers;
devicesState.selectors = null as Selectors;
devicesState.knownDevices = knownDevices;
devicesState.pickedSelector = null as Selector;
devicesState.pickedController = null as Controller;

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
  this.controllers = this.filterDevicesByProperty ('isController');
};

/**
 * Set selectors devices
 */
devicesState.setSelectors = function (): void {
  this.selectors = this.filterDevicesByProperty ('isSelector');
};

/**
 * Pick a device.
 *
 * @param {string} name - The name of the device to pick
 * @param {any} devices - The pool of devices to pick from, either selectors or controllers
 * @returns {Device} - The picked device
 */
devicesState.pickDevice = function (name: string, devices: any): Device {
  const deviceName = Object.keys (this.devices).filter ((n) => n === name)[0];
  if (typeof deviceName === 'undefined') {
    throw new Error (Errors.PickNotFound);
  }

  const device = devices[deviceName];
  device.isPicked = true;
  device.input.isPicked = true;
  device.output.isPicked = true;
  return device;
};

/**
 * Pick a controller by name
 *
 * @param {string} name - controller name
 */
devicesState.pickController = function (name: string): void {
  if (typeof name === 'undefined') {
    return;
  }

  const controller = this.pickDevice (name, this.controllers);
  this.pickedController = controller;
  controllerDevice.init (controller);
  store.save ();
};

/**
 * Pick a selector by name
 *
 * @param {string} name - selector name
 */
devicesState.pickSelector = function (name: string): void {
  if (typeof name === 'undefined') {
    return;
  }

  const selector = this.pickDevice (name, this.selectors);
  this.pickedSelector = selector;
  selectorDevice.init (selector);
  store.save ();
};

type DeviceProperty = 'isController' | 'isSelector';

/**
 * Utility function to filter devices by property
 *
 * @param {string} property - property to filter
 * @returns {*} devices for a given property
 */
devicesState.filterDevicesByProperty = function (property: DeviceProperty): any {
  return Object.keys (this.devices).reduce ((acc, name) => {
    const device = this.devices[name];
    const settings = device.input.settings || device.output.settings || null;

    if (device[property]) {
      device.name = name;
      device.settings = settings;
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

devicesState.unpickDevice = function (port) {
  if (port.isSelector && this.pickedSelector) {
    this.pickedSelector.isPicked = false;
    this.pickedSelector.input.isPicked = false;
    this.pickedSelector.output.isPicked = false;
    this.pickedSelector = null;
  }
  else if (port.isController && this.pickedController) {
    this.pickedController.isPicked = false;
    this.pickedController.input.isPicked = false;
    this.pickedController.output.isPicked = false;
    this.pickedController = null;
  }
  store.save ();
};
