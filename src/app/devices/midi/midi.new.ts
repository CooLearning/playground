// import {WebMidi} from 'webmidi';
// import {
//   DeviceCategory,
//   DeviceInput,
//   DeviceInterface,
//   DeviceOutput,
//   DevicesInterface,
// } from '../device/device.types';
// import {Devices} from '../devices';
//
// interface GetKnownDeviceInfo {
//   isKnown: boolean;
//   isController?: boolean;
//   isSelector?: boolean;
//   settings?: DeviceInterface;
// }
//
// export class MidiNew {
//   public ports: DevicesInterface;
//
//   private isInitialized = false;
//
//   private isReady: Promise<void>;
//
//   private service = WebMidi;
//
//   private sysexEnabled = true;
//
//   private inputs: DeviceInput[];
//
//   private outputs: DeviceOutput[];
//
//   private devices: Devices;
//
//   private constructor(devices: Devices) {
//     this.isReady = new Promise((resolve) => {
//       (async () => {
//         if (this.isInitialized) {
//           throw new Error('Midi is already initialized');
//         }
//
//         this.devices = devices;
//
//         await this.enableService();
//         this.isInitialized = true;
//
//         resolve();
//       })();
//     });
//   }
//
//   public static async init(devices: Devices): Promise<MidiNew> {
//     const instance = new MidiNew(devices);
//     await instance.isReady;
//     return instance;
//   }
//
//   private enableService(): Promise<void> {
//     return new Promise((resolve) => {
//       this.service.enable({
//         sysex: this.sysexEnabled,
//         callback: (error) => {
//           if (error) {
//             throw new Error('WebMidi could not be loaded' + error);
//           }
//
//           this.inputs = this.service.inputs;
//           this.outputs = this.service.outputs;
//
//           this.service.addListener('connected', () => this.handleConnectedEvent());
//           this.service.addListener('disconnected', () => this.handleDisconnectedEvent());
//
//           resolve(null);
//         },
//       });
//     });
//   }
//
//   private getKnownDeviceInfo(manufacturer: string, name: string): any {
//     const device = this.devices.knownDevices
//       .filter((d) => d.manufacturer === manufacturer)
//       // .filter (d => name === d.name)
//       .filter((d) => name.includes(d.name))
//       [0];
//
//     if (device) {
//       return {
//         isKnown: true,
//         isController: device.category === DeviceCategory.controller,
//         isSelector: device.category === DeviceCategory.selector,
//         settings: device,
//       };
//     }
//     else {
//       return {
//         isKnown: false,
//       };
//     }
//   }
//
//   private handleConnectedEvent() {
//     this.inputs.forEach((input) => this.handleConnectedPort(input));
//     this.outputs.forEach((output) => this.handleConnectedPort(output));
//     this.setPorts();
//     // this.store.devices.init(this.ports);
//     this.devices.pickController(this.ports);
//     // this.views.devices.render();
//   }
//
//   private handleConnectedPort(port) {
//     const {manufacturer, name} = port;
//     const {
//       isKnown,
//       isController,
//       isSelector,
//       settings,
//     } = this.getKnownDeviceInfo(manufacturer, name);
//
//     port.isPicked = false;
//
//     if (isKnown) {
//       port.isKnown = true;
//       port.isController = port.isController || isController;
//       port.isSelector = port.isSelector || isSelector;
//       port.settings = port.settings || settings;
//     }
//     else {
//       port.isKnown = false;
//     }
//   }
//
//   private handleDisconnectedEvent() {
//     this.inputs.forEach((input) => this.handleDisconnectedPort(input));
//     this.outputs.forEach((output) => this.handleDisconnectedPort(output));
//     this.setPorts();
//     // this.store.devices.init(this.ports);
//     // this.views.devices.render();
//   }
//
//   private handleDisconnectedPort(port) {
//     // clunky, port.connection is an async getter
//     setTimeout(() => {
//       if (port.isPicked && port.connection !== 'open') {
//         this.devices.unpickDevice(port);
//       }
//     }, 100);
//   }
//
//   private setPorts(): void {
//     const knownInputs = this.inputs.filter((input) => input.isKnown);
//     const knownInputsByName = this.sortPortsByName(knownInputs);
//
//     const knownOutputs = this.outputs.filter((output) => output.isKnown);
//     const knownOutputsByName = this.sortPortsByName(knownOutputs);
//
//     this.ports = Object.keys(knownInputsByName).reduce((acc, name) => {
//       const knownInput = knownInputsByName[name]?.[0] || null;
//       const knownOutput = knownOutputsByName[name]?.[0] || null;
//       const isController = knownInput.isController || false;
//       const isSelector = knownInput.isSelector || false;
//
//       // input or output can be null while connecting/disconnecting
//       if (!knownInput || !knownOutput) {
//         return acc;
//       }
//
//       acc[name] = {
//         isController,
//         isSelector,
//         input: knownInput,
//         output: knownOutput,
//       } as DeviceInterface;
//
//       return acc;
//     }, {});
//   }
//
//   private sortPortsByName(ports): any {
//     return ports.reduce((acc, inputOrOutput) => {
//       const name = inputOrOutput.name;
//       if (!acc[name]) {
//         acc[name] = [];
//       }
//       acc[name].push(inputOrOutput);
//       return acc;
//     }, {});
//   }
// }
