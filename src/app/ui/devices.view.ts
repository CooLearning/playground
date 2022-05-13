// import {AbstractDialog} from './abstract.dialog';
// import {DeviceInterface} from '../devices/device/device.types';
// import {Store} from '../state/store';
//
// interface ShouldRender {
//   selectors: boolean;
//   controllers: boolean;
// }
//
// export class DevicesView extends AbstractDialog {
//   private selectors = {
//     noSelector: '.no-selector',
//     noController: '.no-controller',
//     selectorOptions: '[title=selectors-options]',
//     controllerOptions: '[title=controllers-options]',
//   };
//
//   private isInitialized = false;
//
//   private noSelector: HTMLElement;
//
//   private noController: HTMLElement;
//
//   private selectorOptions: HTMLElement;
//
//   private controllerOptions: HTMLElement;
//
//   private store: Store;
//
//   public constructor(store: Store) {
//     super('#devices');
//
//     this.store = store;
//
//     this.noSelector = this.node.querySelector(this.selectors.noSelector);
//     this.noController = this.node.querySelector(this.selectors.noController);
//
//     this.selectorOptions = this.node.querySelector(this.selectors.selectorOptions);
//     this.controllerOptions = this.node.querySelector(this.selectors.controllerOptions);
//
//     this.isInitialized = true;
//
//     this.render();
//   }
//
//   public render(): void {
//     if (!this.isInitialized) {
//       return;
//     }
//
//     const shouldRender = this.shouldRender();
//
//     // selectors
//     this.noSelector.style.display = shouldRender.selectors ? 'none' : null;
//     this.selectorOptions.style.display = shouldRender.selectors ? null : 'none';
//     this.renderOptions('selector');
//
//     // controllers
//     this.noController.style.display = shouldRender.controllers ? 'none' : null;
//     this.controllerOptions.style.display = shouldRender.controllers ? null : 'none';
//     this.renderOptions('controller');
//   }
//
//   private renderOptions(target: string) {
//     let targetNode;
//     let options;
//     let pickedDevice: DeviceInterface;
//     if (target === 'selector') {
//       targetNode = this.selectorOptions;
//       options = this.store.devices.selectors;
//       pickedDevice = this.store.devices.pickedSelector;
//     }
//     else if (target === 'controller') {
//       targetNode = this.controllerOptions;
//       options = this.store.devices.controllers;
//       pickedDevice = this.store.devices.pickedController;
//     }
//     else {
//       throw new Error('target node is undefined while render options');
//     }
//
//     // purge existing options
//     Array.from(targetNode).forEach((option: HTMLElement) => {
//       targetNode.removeChild(option);
//     });
//
//     // add options
//     if (options) {
//       // default 'none' option
//       const none = document.createElement('option');
//       none.innerText = 'Select port';
//       none.disabled = true;
//       none.selected = pickedDevice === null;
//       targetNode.appendChild(none);
//
//       // add passed options
//       Object.keys(options).forEach((optionName) => {
//         const option = document.createElement('option');
//         option.value = optionName;
//         option.innerText = optionName;
//         option.selected = optionName === pickedDevice?.name;
//         targetNode.appendChild(option);
//       });
//     }
//
//     // add events
//     if (target === 'selector') {
//       targetNode.onchange = (e) => this.store.devices.pickSelector(e.target.value);
//     }
//     else if (target === 'controller') {
//       targetNode.onchange = (e) => this.store.devices.pickController(e.target.value);
//     }
//   }
//
//   private shouldRender(): ShouldRender {
//     console.log(this.store);
//     const {selectors, controllers} = this.store.devices;
//
//     if (!selectors && !controllers) {
//       return {
//         selectors: false,
//         controllers: false,
//       };
//     }
//     else {
//       return {
//         selectors: Object.keys(selectors).length !== 0,
//         controllers: Object.keys(controllers).length !== 0,
//       };
//     }
//   }
// }
