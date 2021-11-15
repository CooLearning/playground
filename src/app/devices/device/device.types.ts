import { Input, Output } from 'webmidi';
import { Controller, Selector } from '../known-devices/known-devices';

export enum DeviceCategory {
  select = 'Selector',
  control = 'Controller',
}

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

export type Device = {
  name: string;
  isController: boolean;
  isSelector: boolean;
  isPicked: boolean;
  input: Input;
  output: Output;
  settings: DeviceSettings;
}

export type Devices = {
  [name: string]: Device;
}

export type Controllers = {
  [name: string]: Controller;
}

export type Selectors = {
  [name: string]: Selector;
}
