// import { devicesState } from '../state/devices.state';
// import { mappingsState } from '../state/mappings.state';
//
// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const packageJson = require ('../../../package.json');
//
// export const store = Object.create (null);
//
// store.state = {
//   version: packageJson.version,
// };
//
// store.load = function () {
//   if (this.state?.devices?.selector) {
//     devicesState.pickSelector (this.state.devices.selector);
//   }
//   if (this.state?.devices?.controller) {
//     devicesState.pickController (this.state.devices.controller);
//   }
//   if (this.state?.mappings?.controlByParameter) {
//     mappingsState.controlByParameter = {
//       ...this.state.mappings.controlByParameter,
//     };
//   }
//   if (this.state?.mappings?.parametersByControl) {
//     mappingsState.parametersByControl = {
//       ...this.state.mappings.parametersByControl,
//     };
//   }
// };
//
// /**
//  * @todo define strategy for overwrite
//  * @param {object} state - The imported state already parsed.
//  */
// store.import = function (state) {
//   if (typeof state === 'undefined') {
//     throw new Error ('store/import: state must be defined');
//   }
//   if (state.version !== this.state.version) {
//     throw new Error ('store/import: versions does not match');
//   }
//
//   if (state?.devices?.selector) {
//     devicesState.pickSelector (state.devices.selector);
//   }
//   if (state?.devices?.controller) {
//     devicesState.pickController (state.devices.controller);
//   }
//   if (state?.mappings?.controlByParameter) {
//     mappingsState.controlByParameter = {
//       ...state.mappings.controlByParameter,
//     };
//   }
//   if (state?.mappings?.parametersByControl) {
//     mappingsState.parametersByControl = {
//       ...state.mappings.parametersByControl,
//     };
//   }
// };
//
// store.save = function () {
//   // build transitive state object
//   const state = { ...this.state };
//
//   // devices
//   state.devices = {
//     selector: devicesState?.pickedSelector?.name || null,
//     controller: devicesState?.pickedController?.name || null,
//   };
//
//   // mappings
//   state.mappings = {
//     controlByParameter: mappingsState?.controlByParameter || null,
//     parametersByControl: mappingsState?.parametersByControl || null,
//   };
//
//   // save
//   this.localStorage = JSON.stringify (state);
// };
//
// store.identifier = 'coolearning';
// Object.defineProperty (store, 'localStorage', {
//   get (): string {
//     return window.localStorage[this.identifier];
//   },
//   set (string: string) {
//     window.localStorage[this.identifier] = string;
//   },
// });
//
// store.init = function () {
//   try {
//     const stateFromStorage = JSON.parse (this.localStorage);
//     if (this.state.version === stateFromStorage.version) {
//       // version matches, can load
//       this.state = stateFromStorage;
//       this.load ();
//     }
//     else {
//       // no match, reset
//       this.reset ();
//     }
//   }
//   catch (error) {
//     // do nothing
//   }
// };
//
// store.delete = function () {
//   window.localStorage.removeItem (this.identifier);
// };
//
// store.reset = function () {
//   this.delete ();
//   this.reloadWindow ();
// };
//
// store.reloadWindow = function () {
//   window.location.reload ();
// };
