import { Controller, Selector } from '../device/device.types';
import { novationLaunchpadX } from './novation-launchpad-x';
import { novationLaunchControlXl } from './novation-launch-control-xl';
import { novationLaunchpadMiniMk2 } from './novation-launchpad-mini-mk2';
import { novationLaunchpadMiniMk3 } from './novation-launchpad-mini-mk3';

/**
 * List of known devices.
 */
export const knownDevices: (Selector | Controller)[] = [
  novationLaunchpadX,
  novationLaunchControlXl,
  novationLaunchpadMiniMk2,
  novationLaunchpadMiniMk3,
];
