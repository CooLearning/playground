import { DeviceSettings, DeviceCategory } from '../device/device.types';

export type NovationLaunchpadX = DeviceSettings & {
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
    layer: number;
  };
}

/**
 * Novation Launchpad X
 *
 * @see Programmer's Reference https://fael-downloads-prod.focusrite.com/customer/prod/s3fs-public/downloads/Launchpad%20X%20-%20Programmers%20Reference%20Manual.pdf
 * @see User Guide https://www.kraftmusic.com/media/ownersmanual/Novation_Launchpad_X_User_Guide.pdf
 */
export const novationLaunchpadX: NovationLaunchpadX = {
  category: DeviceCategory.select,
  manufacturer: 'Focusrite - Novation',
  name: 'Launchpad X',
  channels: {
    input: 'all',
    output: 1,
  },
  lights: {
    first: 11,
    last: 99,
  },
  grid: [
    // describe columns
    // top down then left to right
    [81, 71, 61, 51, 41, 31, 21, 11],
    [82, 72, 62, 52, 42, 32, 22, 12],
    [83, 73, 63, 53, 43, 33, 23, 13],
    [84, 74, 64, 54, 44, 34, 24, 14],
    [85, 75, 65, 55, 45, 35, 25, 15],
    [86, 76, 66, 56, 46, 36, 26, 16],
    [87, 77, 67, 57, 47, 37, 27, 17],
    [88, 78, 68, 58, 48, 38, 28, 18],
  ],
  functionKeys: {
    firstRow: [91, 92, 93, 94, 95, 96, 97, 98],
    lastColumn: [89, 79, 69, 59, 49, 39, 29, 19],
  },
  colors: {
    black: 0,
    silver: 2,
    gray: 1,
    white: 3,
    maroon: 83,
    red: 5,
    purple: 81,
    fuchsia: 53,
    olive: 15,
    lime: 21,
    green: 23,
    yellow: 13,
    navy: 47,
    blue: 67,
    teal: 35,
    turquoise: 38,
    aqua: 37,
  },
  get colorByState () {
    return {
      inputOn: this.colors.yellow,
      inputOff: this.colors.gray,
      neuronOn: this.colors.lime,
      neuronOff: this.colors.gray,
      neuronSelected: this.colors.aqua,
      outputWeightOn: this.colors.fuchsia,
      outputWeightOff: this.colors.gray,
      playbackOn: this.colors.lime,
      playbackOff: this.colors.red,
      layer: this.colors.blue,
    };
  },
  time: {
    wait: 200,
    defaultDuration: 500,
    longClick: 400,
  },
  get bootSequence () {
    return {
      color: this.colors.red,
      sysex: {
        manufacturer: 0,
        data: [32, 41, 2, 12, 14, 1],
      },
    };
  },
};
