import {
  NovationLaunchpadX,
  novationLaunchpadX,
} from './novation-launchpad-x';
import {
  NovationLaunchControlXl,
  novationLaunchControlXl,
} from './novation-launch-control-xl';

export type Controller = NovationLaunchControlXl;
export type Selector = NovationLaunchpadX;

export type KnownDevice = Controller | Selector;

export const knownDevices: KnownDevice[] = [
  novationLaunchpadX,
  novationLaunchControlXl,
];
