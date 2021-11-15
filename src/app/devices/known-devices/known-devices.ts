import { Controller, Selector } from '../device/device.types';
import { novationLaunchpadX } from './novation-launchpad-x';
import { novationLaunchControlXl } from './novation-launch-control-xl';

export const knownDevices: (Selector|Controller)[] = [
  novationLaunchpadX,
  novationLaunchControlXl,
];
