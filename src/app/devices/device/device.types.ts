import {Input, Output} from 'webmidi';

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
export interface DeviceSettingsInterface {
  category?: DeviceCategory;
  manufacturer?: string;
  name?: string;
  channels?: {
    input?: number | 'all';
    output?: number | 'all';
  };
  lights?: {
    first?: number;
    last?: number;
  };
  colors?: {
    [name: string]: number;
  };
  time?: {
    wait?: number;
    defaultDuration?: number;
    [other: string]: number;
  };
  bootSequence?: {
    color?: number;
    sysex?: {
      manufacturer?: number;
      data?: number[];
    };
  };
}

/**
 * Specific settings for selector devices.
 */
export interface SelectorSettings extends DeviceSettingsInterface {
  grid?: number[][];
  functionKeys?: {
    firstRow?: number[];
    lastColumn?: number[];
  };
  colorByState?: {
    inputOn?: number;
    inputOff?: number;
    neuronOn?: number;
    neuronOff?: number;
    neuronSelected?: number;
    outputWeightOn?: number;
    outputWeightOff?: number;
    playbackOn?: number;
    playbackOff?: number;
    layerOn?: number;
    layerOff?: number;
  };
}

/**
 * Specific settings for controller devices.
 */
export interface ControllerSettings extends DeviceSettingsInterface {
  rows?: any;
  outputByInput?: {
    [output: number]: number;
  };
  colorByState?: {
    defaultMode?: number;
    selectMode?: number;
    layerMode?: number;
    feedback?: number;
    shift?: number;
    unsnap?: number;
    snap?: number;
  };
}

export interface DeviceInput extends Input {
  isKnown?: boolean;
  settings?: DeviceSettingsInterface;
}

export interface DeviceOutput extends Output {
  isKnown?: boolean;
  settings?: DeviceSettingsInterface;
}

/**
 * Shape of a device.
 */
export interface DeviceInterface {
  name?: string;
  isController?: boolean;
  isSelector?: boolean;
  isPicked?: boolean;
  input?: DeviceInput;
  output?: DeviceOutput;
  settings?: DeviceSettingsInterface;
}

/**
 * Shape for a list of generic devices.
 */
export interface DevicesInterface {
  [name: string]: DeviceInterface;
}

/**
 * Shape for a list of controller devices.
 */
export type Controllers = {
  [name: string]: ControllerSettings;
}

/**
 * Shape for a list of selector devices.
 */
export type Selectors = {
  [name: string]: SelectorSettings;
}
