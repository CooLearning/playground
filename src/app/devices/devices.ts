// // import {Controller} from './controller/controller';
// import {Selector} from './selector/selector';
// import {MidiNew} from './midi/midi.new';
// import {knownDevices} from './known-devices/known-devices';
// import {DevicesInterface} from './device/device.types';
//
// export class Devices {
//   public selector: Selector;
//
//   // public controller: Controller;
//
//   public knownDevices = knownDevices;
//
//   private midi: MidiNew;
//
//   private isReady: Promise<void>;
//
//   private constructor() {
//     this.isReady = new Promise((resolve) => {
//       (async () => {
//         this.midi = await MidiNew.init(this);
//
//         // this.selector = new Selector();
//         resolve();
//       })();
//     });
//   }
//
//   public static async init(): Promise<Devices> {
//     const devices = new Devices();
//     await devices.isReady;
//     return devices;
//   }
//
//   public async pickController(ports: DevicesInterface): Promise<void> {
//     // this.controller = await Controller.init();
//   }
//
//   public unpickDevice(port): void {
//     console.log('lol');
//     // todo: fix
//     // if (port.isSelector && this.pickedSelector) {
//     //   this.pickedSelector.isPicked = false;
//     //   this.pickedSelector.input.isPicked = false;
//     //   this.pickedSelector.output.isPicked = false;
//     //   this.pickedSelector = null;
//     // }
//     // else if (port.isController && this.pickedController) {
//     //   this.pickedController.isPicked = false;
//     //   this.pickedController.input.isPicked = false;
//     //   this.pickedController.output.isPicked = false;
//     //   this.pickedController = null;
//     // }
//     // store.save();
//   }
// }
