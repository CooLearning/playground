import { Selector, DeviceCategory } from '../device/device.types';

/**
 * Novation Launchpad Mini
 *
 * @see http://leemans.ch/latex/doc_launchpad-programmers-reference.pdf
 */
export const novationLaunchpadMini: Selector = {
  category: DeviceCategory.select,
  manufacturer: 'Focusrite A.E. Ltd',
  name: 'Launchpad Mini',
  channels: {
    input: 'all',
    output: 1,
  },
  lights: {
    first: 0,
    last: 120,
  },
  grid: [
    // describe columns
    // top down then left to right
    [0, 16, 32, 48, 64, 80, 96, 112],
    [1, 17, 33, 49, 65, 81, 97, 113],
    [2, 18, 34, 50, 66, 82, 98, 114],
    [3, 19, 35, 51, 67, 83, 99, 115],
    [4, 20, 36, 52, 68, 84, 100, 116],
    [5, 21, 37, 53, 69, 85, 101, 117],
    [6, 22, 38, 54, 70, 86, 102, 118],
    [7, 23, 39, 55, 71, 87, 103, 119],
  ],
  functionKeys: {
    firstRow: [104, 105, 106, 107, 108, 109, 110, 111],
    lastColumn: [8, 24, 40, 56, 72, 88, 104, 120],
  },
  colors: {
    black: 0,
    off: 0,
    red: 15,
    amber: 63,
    yellow: 62,
    green: 60,
  },
  get colorByState () {
    return {
      inputOn: this.colors.red,
      inputOff: this.colors.black,
      neuronOn: this.colors.green,
      neuronOff: this.colors.black,
      neuronSelected: this.colors.yellow,
      outputWeightOn: this.colors.red,
      outputWeightOff: this.colors.black,
      playbackOn: this.colors.green,
      playbackOff: this.colors.red,
      layerOn: this.colors.amber,
      layerOff: this.colors.black,
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
