import { Input, Output } from 'webmidi';

/**
 * Enumerate device categories.
 */
export enum DeviceCategory {
  selector = 'Selector',
  controller = 'Controller',
}

/**
 * Settings for a generic device.
 */
export type DeviceSettings = {
  category: DeviceCategory;
  manufacturer: string;
  name: string;
  channels: {
    input: number | 'all';
    output: number | 'all';
  };
  lights: {
    first: number;
    last: number;
  };
  colors: {
    [name: string]: number;
  };
  time: {
    wait: number;
    defaultDuration: number;
    [other: string]: number;
  };
  bootSequence: {
    color: number;
    sysex?: {
      manufacturer: number;
      data: number[];
    };
  };
}

/**
 * Specific settings for selector devices.
 */
export type Selector = DeviceSettings & {
  grid: number[][];
  functionKeys: {
    firstRow: number[];
    lastColumn: number[];
  };
  colorByState: {
    inputOn: number;
    inputOff: number;
    neuronOn: number;
    neuronOff: number;
    neuronSelected: number;
    outputWeightOn: number;
    outputWeightOff: number;
    playbackOn: number;
    playbackOff: number;
    layerOn: number;
    layerOff: number;
  };
}

/**
 * Specific settings for controller devices.
 */
export type Controller = DeviceSettings & {
  rows: any;
  outputByInput: {
    [output: number]: number;
  };
  colorByState: {
    defaultMode: number;
    selectMode: number;
    layerMode: number;
    feedback: number;
    shift: number;
    unsnap: number;
    snap: number;
  };
}

/**
 * Shape of a device.
 */
export type Device = {
  name: string;
  isController: boolean;
  isSelector: boolean;
  isPicked: boolean;
  input: Input;
  output: Output;
  settings: DeviceSettings;
}

/**
 * Shape for a list of generic devices.
 */
export type Devices = {
  [name: string]: Device;
}

/**
 * Shape for a list of controller devices.
 */
export type Controllers = {
  [name: string]: Controller;
}

/**
 * Shape for a list of selector devices.
 */
export type Selectors = {
  [name: string]: Selector;
}
