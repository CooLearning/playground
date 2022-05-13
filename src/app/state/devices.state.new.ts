// import {
//   ControllerInterface,
//   Controllers,
//   DeviceInterface,
//   DevicesInterface,
//   SelectorInterface,
//   Selectors,
// } from '../devices/device/device.types';
// import {knownDevices} from '../devices/known-devices/known-devices';
// import {devicesUi} from '../ui/devices.ui';
// import {controllerDevice} from '../devices/controller.device';
// import {store} from '../store/store';
// import {selectorDevice} from '../devices/selector.device';
// import {MidiNew} from '../devices/midi/midi.new';
//
// enum Errors {
//   PickNotFound = 'Picked device could not be found'
// }
//
// export class DevicesStateNew {
//   public controllers: Controllers;
//
//   public selectors: Selectors;
//
//   public knownDevices = knownDevices;
//
//   public pickedController: ControllerInterface;
//
//   public pickedSelector: SelectorInterface;
//
//   private devices: DevicesInterface;
//
//   private midi: MidiNew;
//
//   private isReady: Promise<void>;
//
//   private constructor() {
//     this.isReady = new Promise((resolve) => {
//       (async () => {
//         // this.devices = this.midi.ports;
//         this.midi = await MidiNew.init();
//         this.devices = this.midi.ports;
//         this.sortDevices();
//         resolve();
//       })();
//     });
//   }
//
//   public static async init(): Promise<DevicesStateNew> {
//     const instance = new DevicesStateNew();
//     await instance.isReady;
//     return instance;
//   }
//
//   public pickController(name: string): void {
//     if (typeof name === 'undefined') {
//       return;
//     }
//
//     const controller = this.pickDevice(name, this.controllers);
//     this.pickedController = controller;
//     controllerDevice.init(controller);
//     store.save();
//   }
//
//   public pickSelector(name: string): void {
//     if (typeof name === 'undefined') {
//       return;
//     }
//
//     const selector = this.pickDevice(name, this.selectors);
//     this.pickedSelector = selector;
//     selectorDevice.init(selector);
//     store.save();
//   }
//
//   private setControllers() {
//     this.controllers = this.filterDevicesByProperty('isController') as Controllers;
//   }
//
//   private setSelectors() {
//     this.selectors = this.filterDevicesByProperty('isSelector') as Selectors;
//   }
//
//   private sortDevices() {
//     this.setControllers();
//     this.setSelectors();
//     devicesUi.render(); // todo: wtf are you doing here
//   }
//
//   private filterDevicesByProperty(property: 'isController' | 'isSelector'): Controllers | Selectors {
//     return Object.keys(this.devices).reduce((acc, name) => {
//       const device = this.devices[name];
//       const settings = device.input.settings || device.output.settings || null;
//
//       if (device[property]) {
//         device.name = name;
//         device.settings = settings;
//         acc[name] = device;
//       }
//
//       return acc;
//     }, {});
//   }
//
//   private pickDevice(name: string, devices: any): DeviceInterface {
//     const deviceName = Object.keys(this.devices).filter((n) => n === name)[0];
//     if (typeof deviceName === 'undefined') {
//       throw new Error(Errors.PickNotFound);
//     }
//
//     const device = devices[deviceName];
//     device.isPicked = true;
//     device.input.isPicked = true;
//     device.output.isPicked = true;
//     return device;
//   }
// }
