import {ControllerSettings, SelectorSettings} from '../device/device.types';
import {novationLaunchpadX} from './novation-launchpad-x';
import {novationLaunchControlXl} from './novation-launch-control-xl';
import {novationLaunchpadMini} from './novation-launchpad-mini';

/**
 * List of known devices.
 */
export const knownDevices: (SelectorSettings | ControllerSettings)[] = [
  novationLaunchpadX,
  novationLaunchControlXl,
  novationLaunchpadMini,
];
