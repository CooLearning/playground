import { Selector, DeviceCategory } from '../device/device.types';
import { novationLaunchpadX } from './novation-launchpad-x';

/**
 * Novation Launchpad Mini Mk3
 *
 * @see Novation resources https://downloads.novationmusic.com/novation/launchpad-mk3/launchpad-mini-mk3-0
 */
export const novationLaunchpadMiniMk3 = {
  ...novationLaunchpadX, // shallow copy but it is probably not meant to be mutated anyway
  name: 'Launchpad Mini MK3', // https://github.com/rienheuver/launchpad-mini-mk3/blob/master/index.js#L7 , mine is 'Launchpad Mini MK3 LPMiniMK3 MI'
  get bootSequence () {
    return {
      color: novationLaunchpadX.colors.red,
      sysex: {
        manufacturer: 0,
        data: [32, 41, 2, 13, 14, 1], // https://github.com/FMMT666/launchpad.py/blob/master/launchpad_py/launchpad.py#L2375
      },
    };
  },
} as Selector;
