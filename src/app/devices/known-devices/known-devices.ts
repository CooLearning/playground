import { Controller, Selector } from '../device/device.types';
import { novationLaunchpadX } from './novation-launchpad-x';
import { novationLaunchControlXl } from './novation-launch-control-xl';
import { novationLaunchpadMini } from './novation-launchpad-mini';

/**
 * List of known devices.
 */
export const knownDevices: (Selector | Controller)[] = [
  novationLaunchpadX,
  novationLaunchControlXl,
  novationLaunchpadMini,
];
