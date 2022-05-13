// import {isTabActive} from '../utils/is-tab-active';
// import {rangeMap} from '../utils/range-map';
// import {Views} from './views';
// import {Store} from '../state/store';
// import {Devices} from '../devices/devices';
//
// export class PlaygroundView {
//   private views: Views;
//
//   private store: Store;
//
//   private devices: Devices;
//
//   private selectors = {
//     layer: '.plus-minus-neurons',
//   };
//
//   private layers: HTMLDivElement[];
//
//   public constructor(views: Views, store: Store, devices: Devices) {
//     this.views = views;
//     this.store = store;
//     this.devices = devices;
//
//     this.fetchLayers();
//     this.attachLayers();
//     this.renderLayers();
//   }
//
//   private attachLayers() {
//     this.layers.forEach((layer, index) => {
//       layer.onclick = () => {
//         this.store.network.setLayer(index);
//         this.renderLayers();
//         this.views.layerCard.updateCard();
//         this.devices.selector.renderLayers();
//         this.devices.controller.updateMode();
//       };
//     });
//   }
//
//   private fetchLayers() {
//     this.layers = Array.from(document.querySelectorAll(this.selectors.layer));
//   }
//
//   private renderLayers() {
//     this.layers.forEach((layer, index) => {
//       layer.style.outline = '1px solid black';
//       layer.style.cursor = 'pointer';
//       layer.style.userSelect = 'none';
//       layer.style.height = '28px';
//
//       const child = layer.children[0] as HTMLDivElement;
//       child.style.height = '100%';
//
//       if (index === this.store.network.selectedLayerIndex) {
//         layer.style.backgroundColor = 'yellow';
//       }
//       else {
//         layer.style.backgroundColor = null;
//       }
//     });
//   }
//
//   private updateParameter(name: string, value: number) {
//     if (typeof name === 'undefined') {
//       throw new Error('parameter is not defined');
//     }
//     if (typeof value === 'undefined') {
//       throw new Error('value is not defined');
//     }
//     if (!isTabActive()) {
//       return;
//     }
//
//     const parameter = this.views.mappings.parameterQueries[name];
//     if (!parameter) {
//       throw new Error('parameter name was not found in listed nodes');
//     }
//
//     // render the parameter depending on its HTML nature.
//     switch (parameter.tagName) {
//       case 'SELECT': {
//         const length = parameter.children.length - 1;
//         const scaledValue = rangeMap(value, 0, 127, 0, length);
//         const scaledInteger = parseInt(scaledValue.toString());
//         const areDifferent = scaledInteger !== parameter.selectedIndex;
//
//         if (areDifferent) {
//           parameter.selectedIndex = scaledInteger;
//           parameter.dispatchEvent(new Event('change'));
//         }
//
//         break;
//       }
//
//       case 'BUTTON': {
//         parameter.click();
//         break;
//       }
//
//       case 'INPUT': {
//         const min = parseInt(parameter.min);
//         const max = parseInt(parameter.max);
//         const step = parseInt(parameter.step);
//
//         const v = rangeMap(value, 0, 127, min, max);
//         const n = parseInt(v.toString());
//         const isStep = (n % step) === 0;
//         const areDifferent = n !== parseInt(parameter.value);
//
//         if (isStep && areDifferent) {
//           parameter.value = n.toString();
//           parameter.dispatchEvent(new Event('input'));
//         }
//
//         break;
//       }
//
//       case 'LABEL': {
//         if (value === 0) {
//           return;
//         }
//         parameter.click();
//         break;
//       }
//
//       default:
//         throw new Error(`${parameter.tagName} target not handled`);
//     }
//   }
// }
