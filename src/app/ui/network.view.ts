// import * as d3 from 'd3';
// import {Views} from './views';
// import {Devices} from '../devices/devices';
// import {Store} from '../state/store';
// import {PlaygroundFacadeNew} from '../facades/playground.facade.new';
//
// export class NetworkView {
//   private views: Views;
//
//   private store: Store;
//
//   private devices: Devices;
//
//   public constructor(views: Views, store: Store, devices: Devices) {
//     this.views = views;
//     this.store = store;
//     this.devices = devices;
//   }
//
//   public toggleNeuron(index: number): void {
//     if (this.store.network.isLayerMode) {
//       return;
//     }
//
//     const {isEnabled} = this.store.network.getNeuron(index);
//     const nextEnabled = !isEnabled;
//     const canvas = d3.select(`#canvas-${index}`);
//     canvas.classed('disabled', !nextEnabled);
//
//     if (nextEnabled === false) {
//       this.toggleNodeSelection(index, false);
//     }
//
//     this.store.network.toggleNeuron(index);
//
//     this.views.selectCard.updateCard();
//     PlaygroundFacadeNew.updateWeightsUI();
//
//     this.devices.selector.setNeuronLight({
//       index,
//       isDisabled: !nextEnabled,
//     });
//   }
//
//   public toggleNodeSelection(nodeIndex: number, isSelected: boolean): void {
//     if (this.store.network.isLayerMode) {
//       return;
//     }
//
//     if (typeof nodeIndex !== 'number') {
//       throw new Error('nodeId is not a number');
//     }
//
//     // playground local state
//     if (isSelected) {
//       PlaygroundFacadeNew.selectNode(nodeIndex);
//     }
//     else {
//       PlaygroundFacadeNew.unselectNode(nodeIndex);
//     }
//
//     // styling
//     if (this.store.network.isOutputNode(nodeIndex)) {
//       const canvas = document.querySelector('#heatmap').children[0].children[0] as HTMLCanvasElement;
//
//       if (isSelected) {
//         canvas.style.border = '2px solid cyan';
//         canvas.style.margin = '-2px';
//       }
//       else {
//         canvas.style.border = null;
//         canvas.style.margin = null;
//       }
//     }
//     else {
//       const canvas = d3.select(`#canvas-${nodeIndex}`);
//       canvas.classed('selected', isSelected);
//     }
//
//     this.views.selectCard.updateCard();
//
//     this.devices.selector.setNeuronLight({index: nodeIndex, isSelected});
//     this.devices.controller.onSelectionEvent(); // todo: replace with this.controller.render();
//   }
//
//   public toggleInput(slug: string): void {
//     if (this.store.network.isLayerMode) {
//       return;
//     }
//
//     const input = this.store.network.toggleInput(slug);
//
//     // DOM
//     const canvas = d3.select(`#canvas-${slug}`);
//     canvas.classed('disabled', !input.isEnabled);
//
//     PlaygroundFacadeNew.updateWeightsUI();
//
//     // device
//     if (this.devices.selector.isInitialized === true) {
//       this.devices.selector.setInputLight(input.id, input.isEnabled);
//     }
//   }
// }
