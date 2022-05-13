import {ControllerSettings, DeviceCategory} from '../device/device.types';

/**
 * Novation Launch Control XL
 *
 * @see Programmer's Reference https://resource.novationmusic.com/sites/default/files/novation/downloads/9922/launch-control-xl-programmers-reference-guide.pdf
 */
export const novationLaunchControlXl: ControllerSettings = {
  category: DeviceCategory.controller,
  manufacturer: 'Focusrite A.E. Ltd',
  name: 'Launch Control XL',
  channels: {
    input: 'all',
    output: 'all',
  },
  lights: {
    first: 1,
    last: 127,
  },
  colors: {
    off: 12,
    black: 12,
    red: 15,
    amber: 63,
    yellow: 62,
    green: 60,
  },
  time: {
    wait: 200,
    defaultDuration: 500,
  },
  get bootSequence() {
    return {
      color: this.colors.red,
    };
  },
  get colorByState() {
    return {
      defaultMode: this.colors.black,
      selectMode: this.colors.green,
      layerMode: this.colors.amber,
      feedback: this.colors.green,
      shift: this.colors.amber,
      unsnap: this.colors.red,
      snap: this.colors.green,
    };
  },
  rows: {
    firstPots: [13, 14, 15, 16, 17, 18, 19, 20],
    secondPots: [29, 30, 31, 32, 33, 34, 35, 36],
    thirdPots: [49, 50, 51, 52, 53, 54, 55, 56],
    faders: [77, 78, 79, 80, 81, 82, 83, 84],
    firstButtons: [41, 42, 43, 44, 57, 58, 59, 60],
    secondButtons: [73, 74, 75, 76, 89, 90, 91, 92],
  },
  outputByInput: {
    // first row
    13: 13,
    14: 29,
    15: 45,
    16: 61,
    17: 77,
    18: 93,
    19: 109,
    20: 125,
    // second row
    29: 14,
    30: 30,
    31: 46,
    32: 62,
    33: 78,
    34: 94,
    35: 110,
    36: 126,
    // third row
    49: 15,
    50: 31,
    51: 47,
    52: 63,
    53: 79,
    54: 95,
    55: 111,
    56: 127,
    // fader to "track focus" line
    77: 41,
    78: 42,
    79: 43,
    80: 44,
    81: 57,
    82: 58,
    83: 59,
    84: 60,
    // // fader to "track focus" line
    // 77: 15,
    // 78: 31,
    // 79: 47,
    // 80: 63,
    // 81: 79,
    // 82: 95,
    // 83: 111,
    // 84: 127,
  },
};
