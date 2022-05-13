// import {devicesState} from '../state/devices.state';
// import {mappingsState} from '../state/mappings.state';
// import {DevicesStateNew} from '../state/devices.state.new';
// import {MappingsStateNew} from '../state/mappings.state.new';
//
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const packageJson = require('../../../package.json');
//
// interface State {
//   version: number;
//   devices?: DevicesStateNew;
//   mappings?: MappingsStateNew;
// }
//
// export class StoreNew {
//   private identifier = 'coolearning';
//
//   private state: State = {
//     version: packageJson.version,
//   };
//
//   private get localStorage() {
//     return window.localStorage[this.identifier];
//   }
//
//   private set localStorage(string: string) {
//     window.localStorage[this.identifier] = string;
//   }
//
//   private delete() {
//     window.localStorage.removeItem(this.identifier);
//   }
//
//   private import(state) {
//     if (typeof state === 'undefined') {
//       throw new Error('store/import: state must be defined');
//     }
//     if (state.version !== this.state.version) {
//       throw new Error('store/import: versions does not match');
//     }
//
//     if (state?.devices?.selector) {
//       devicesState.pickSelector(state.devices.selector);
//     }
//     if (state?.devices?.controller) {
//       devicesState.pickController(state.devices.controller);
//     }
//     if (state?.mappings?.controlByParameter) {
//       mappingsState.controlByParameter = {
//         ...state.mappings.controlByParameter,
//       };
//     }
//     if (state?.mappings?.parametersByControl) {
//       mappingsState.parametersByControl = {
//         ...state.mappings.parametersByControl,
//       };
//     }
//   }
//
//   private init() {
//     try {
//       const stateFromStorage = JSON.parse(this.localStorage);
//       if (this.state.version === stateFromStorage.version) {
//         // version matches, can load
//         this.state = stateFromStorage;
//         this.load();
//       }
//       else {
//         // no match, reset
//         this.reset();
//       }
//     }
//     catch (error) {
//       // do nothing
//     }
//   }
//
//   private load() {
//     // if (this.state?.devices?.selector) {
//     //   devicesState.pickSelector(this.state.devices.selector);
//     // }
//     // if (this.state?.devices?.controller) {
//     //   devicesState.pickController(this.state.devices.controller);
//     // }
//     if (this.state?.mappings?.controlByParameter) {
//       mappingsState.controlByParameter = {
//         ...this.state.mappings.controlByParameter,
//       };
//     }
//     if (this.state?.mappings?.parametersByControl) {
//       mappingsState.parametersByControl = {
//         ...this.state.mappings.parametersByControl,
//       };
//     }
//   }
//
//   private reloadWindow() {
//     window.location.reload();
//   }
//
//   private reset() {
//     this.delete();
//     this.reloadWindow();
//   }
//
//   private save() {
//     // build transitive state object
//     const state = {...this.state};
//
//     // // devices
//     // state.devices = {
//     //   selector: devicesState?.pickedSelector?.name || null,
//     //   controller: devicesState?.pickedController?.name || null,
//     // };
//     //
//     // // mappings
//     // state.mappings = {
//     //   controlByParameter: mappingsState?.controlByParameter || null,
//     //   parametersByControl: mappingsState?.parametersByControl || null,
//     // };
//
//     // save
//     this.localStorage = JSON.stringify(state);
//   }
// }
