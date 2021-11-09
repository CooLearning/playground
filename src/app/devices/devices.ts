import {
  Controller,
  Selector,
  knownDevices,
} from './known-devices/known-devices';
import { Controllers, Devices, Selectors } from './device/device.types';

export const devices = Object.create (null);

devices.isInitialized = false as boolean;
devices.devices = null as Devices;
devices.used = null as Devices;
devices.controllers = null as Controllers;
devices.selectors = null as Selectors;
devices.knownDevices = knownDevices;

/**
 * Initialize devices
 *
 * @param {*} ports - devices to reference
 */
devices.init = function (ports: any): void {
  if (this.isInitialized) {
    throw new Error ('devices is already initialized');
  }

  this.devices = ports;
  this.sortDevices ();

  this.isInitialized = true;
};

/**
 * Sort devices by category
 */
devices.sortDevices = function (): void {
  this.setControllers ();
  this.setSelectors ();
};

/**
 * Set controllers devices
 */
devices.setControllers = function (): void {
  this.controllers = this.pickDevicesByProperty ('isController');
};

/**
 * Set selectors devices
 */
devices.setSelectors = function (): void {
  this.selectors = this.pickDevicesByProperty ('isSelector');
};

/**
 * Set used devices
 */
devices.setUsed = function (): void {
  this.used = this.pickDevicesByProperty ('isUsed');
};

/**
 * Pick a controller by index
 *
 * @param {number} index - controller index
 * @returns {*} controller
 */
devices.pickController = function (index: number): Controller {
  const controller = this.controllers[Object.keys (this.controllers)[index]];
  controller.isUsed = true;
  controller.input.isUsed = true;
  controller.output.isUsed = true;
  this.setUsed ();
  return controller;
};

/**
 * Pick a selector by index
 *
 * @param {number} index - selector index
 * @returns {*} selector
 */
devices.pickSelector = function (index: number): Selector {
  const selector = this.selectors[Object.keys (this.selectors)[index]];
  selector.isUsed = true;
  selector.input.isUsed = true;
  selector.output.isUsed = true;
  this.setUsed ();
  return selector;
};

type DeviceProperty = 'isController' | 'isSelector' | 'isUsed';

/**
 * Utility function to pick devices by property
 *
 * @param {string} property - property to pick
 * @returns {*} devices for a given property
 */
devices.pickDevicesByProperty = function (property: DeviceProperty): any {
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
