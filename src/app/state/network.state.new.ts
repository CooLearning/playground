// import {PlaygroundFacadeNew} from '../facades/playground.facade.new';
// import {playgroundFacade} from '../facades/playground.facade';
// import {networkState} from './network.state';
// import {activations, regularizations} from '../../playground/state';
// import {selectorDevice} from '../devices/selector.device';
// import {Link} from './network.state.types';
// import {Node} from '../../playground/nn';
//
// interface GetNeuron {
//   neuron: Node;
//   isEnabled: boolean;
// }
//
// interface GetNeuronAndLayerIndexes {
//   neuronIndex: number;
//   layerIndex: number;
// }
//
// export class NetworkStateNew {
//   public selectedLayerIndex = null;
//
//   public get neurons() {
//     return this.nodes.slice(1, -1);
//   }
//
//   public get isLayerMode() {
//     return this.selectedLayerIndex !== null;
//   }
//
//   private get nodes() {
//     return PlaygroundFacadeNew.network;
//   }
//
//   private get inputs() {
//     return this.nodes[0];
//   }
//
//   private get output() {
//     return this.nodes[this.nodes.length - 1][0];
//   }
//
//   public setSourceRegularizationType(index, name): boolean {
//     let hasChanged = false;
//
//     const selectedNeurons = this.getSelectedNeurons();
//     selectedNeurons.forEach((neuron) => {
//       const link = neuron.inputLinks?.[index];
//       if (
//         typeof link === 'undefined'
//         || link?.isDead
//         || name === link.source.regularization.name
//       ) {
//         return;
//       }
//
//       link.source.regularization = regularizations[name];
//       hasChanged = true;
//     });
//
//     return hasChanged;
//   }
//
//   public getNeuron(nodeIndex: number): GetNeuron {
//     const {neuronIndex, layerIndex} = this.getNeuronAndLayerIndexes(nodeIndex);
//     const neuron = this.neurons[layerIndex - 1][neuronIndex - 1];
//     const {isEnabled} = neuron;
//     return {
//       neuron,
//       isEnabled,
//     };
//   }
//
//   public getOutputNode(): Node {
//     return this.nodes[this.nodes.length - 1][0];
//   }
//
//   public isOutputNode(index): boolean {
//     return index === parseInt(networkState.nodes[networkState.nodes.length - 1][0].id);
//   }
//
//   public setSourceActivation(index, name): boolean {
//     let hasChanged = false;
//
//     const selectedNeurons = this.getSelectedNeurons();
//     selectedNeurons.forEach((neuron) => {
//       const link = neuron.inputLinks?.[index];
//       if (
//         typeof link === 'undefined'
//         || link?.isDead
//         || name === link.source.activation.name
//       ) {
//         return;
//       }
//
//       link.source.activation = activations[name];
//       hasChanged = true;
//     });
//
//     return hasChanged;
//   }
//
//   public setSourceBias(index, value): boolean {
//     let hasChanged = false;
//
//     const selectedNeurons = this.getSelectedNeurons();
//     selectedNeurons.forEach((neuron) => {
//       const link = neuron.inputLinks?.[index];
//       if (
//         typeof link === 'undefined'
//         || link?.isDead
//         || typeof link?.source?.bias === 'undefined'
//       ) {
//         return;
//       }
//
//       link.source.bias = value;
//       hasChanged = true;
//     });
//
//     return hasChanged;
//   }
//
//   public setSourceLearningRate(index, value): boolean {
//     let hasChanged = false;
//
//     const selectedNeurons = this.getSelectedNeurons();
//     selectedNeurons.forEach((neuron) => {
//       const link = neuron.inputLinks?.[index];
//       if (
//         typeof link === 'undefined'
//         || link?.isDead
//         || value === link.source.learningRate
//       ) {
//         return;
//       }
//
//       link.source.learningRate = value;
//       hasChanged = true;
//     });
//
//     return hasChanged;
//   }
//
//   public setSourceRegularizationRate(index, value): boolean {
//     let hasChanged = false;
//
//     const selectedNeurons = this.getSelectedNeurons();
//     selectedNeurons.forEach((neuron) => {
//       const link = neuron.inputLinks?.[index];
//       if (
//         typeof link === 'undefined'
//         || link?.isDead
//         || value === link.source.regularizationRate
//       ) {
//         return;
//       }
//
//       link.source.regularizationRate = value;
//       hasChanged = true;
//     });
//
//     return hasChanged;
//   }
//
//   public setSourceWeight(index, value): boolean {
//     let hasChanged = false;
//
//     const selectedNeurons = this.getSelectedNeurons();
//     selectedNeurons.forEach((neuron) => {
//       const link = neuron.inputLinks?.[index];
//       if (
//         typeof link === 'undefined'
//         || link?.isDead
//         || typeof link?.weight === 'undefined'
//       ) {
//         return;
//       }
//
//       link.weight = value;
//       hasChanged = true;
//     });
//
//     return hasChanged;
//   }
//
//   public setActivation(index: number, name: string) {
//     let hasChanged = false;
//     const neurons = this.neurons[this.selectedLayerIndex];
//     const neuron = neurons[index];
//
//     if (
//       neuron.isEnabled === false
//       || name === neuron.activation.name
//     ) {
//       return hasChanged;
//     }
//
//     neuron.activation = activations[name];
//
//     hasChanged = true;
//     return hasChanged;
//   }
//
//   public setBias(index: number, value: number) {
//     let hasChanged = false;
//     const neurons = this.neurons[this.selectedLayerIndex];
//     const neuron = neurons[index];
//
//     if (
//       neuron.isEnabled === false
//       || typeof neuron?.bias === 'undefined'
//       || value === neuron?.bias
//     ) {
//       return hasChanged;
//     }
//
//     neuron.bias = value;
//
//     hasChanged = true;
//     return hasChanged;
//   }
//
//   public setLearningRate(index: number, value: number) {
//     let hasChanged = false;
//     const neurons = this.neurons[this.selectedLayerIndex];
//     const neuron = neurons[index];
//
//     if (
//       neuron.isEnabled === false
//       || value === neuron.learningRate
//     ) {
//       return hasChanged;
//     }
//
//     neuron.learningRate = value;
//
//     hasChanged = true;
//     return hasChanged;
//   }
//
//   public setRegularizationRate(index: number, value: number) {
//     let hasChanged = false;
//     const neurons = this.neurons[this.selectedLayerIndex];
//     const neuron = neurons[index];
//
//     if (
//       neuron.isEnabled === false
//       || typeof neuron?.regularizationRate === 'undefined'
//       || value === neuron?.regularizationRate
//     ) {
//       return hasChanged;
//     }
//
//     neuron.regularizationRate = value;
//
//     hasChanged = true;
//     return hasChanged;
//   }
//
//   public setRegularizationType(index: number, name: string) {
//     let hasChanged = false;
//     const neurons = this.neurons[this.selectedLayerIndex];
//     const neuron = neurons[index];
//
//     if (
//       neuron.isEnabled === false
//       || name === neuron.regularization.name
//     ) {
//       return hasChanged;
//     }
//
//     neuron.regularization = regularizations[name];
//
//     hasChanged = true;
//     return hasChanged;
//   }
//
//   public toggleNeuron(nodeIndex: number) {
//     const {neuron, isEnabled} = this.getNeuron(nodeIndex);
//
//     neuron.isEnabled = !isEnabled;
//
//     // input weights
//     neuron.inputLinks.forEach((link: Link) => {
//       if (link.source.isEnabled === false) {
//         return;
//       }
//
//       if (neuron.isEnabled) {
//         link.isDead = false;
//         link.weight = link.savedWeight || Math.random() - 0.5;
//       }
//       else {
//         link.isDead = true;
//         link.savedWeight = link.weight;
//         link.weight = 0;
//       }
//     });
//
//     // output weights
//     neuron.outputs.forEach((link: Link) => {
//       if (link.dest.isEnabled === false) {
//         return;
//       }
//
//       if (neuron.isEnabled) {
//         link.isDead = false;
//         link.weight = link.savedWeight || Math.random() - 0.5;
//       }
//       else {
//         link.isDead = true;
//         link.savedWeight = link.weight;
//         link.weight = 0;
//       }
//     });
//   }
//
//   public toggleInput(slug: string) {
//     const input = this.inputs.filter((input) => input.id === slug)[0];
//     input.isEnabled = !input.isEnabled;
//
//     input.outputs.forEach((outputLink) => {
//       if (!outputLink.dest.isEnabled) {
//         outputLink.isDead = true;
//         outputLink.weight = 0;
//         return;
//       }
//
//       outputLink.isDead = !input.isEnabled;
//       outputLink.weight = input.isEnabled
//         ? Math.random() - 0.5
//         : 0;
//     });
//     return input;
//   }
//
//   public setLayer(index: number) {
//     if (this.selectedLayerIndex === null) {
//       // no layer selected
//       this.selectedLayerIndex = index;
//     }
//     else if (index !== this.selectedLayerIndex) {
//       // switch layer
//       this.selectedLayerIndex = index;
//     }
//     else {
//       // toggle layer
//       this.selectedLayerIndex = null;
//     }
//     return this.selectedLayerIndex;
//   }
//
//   private getInputByIndex(index: number) {
//     return this.inputs[index];
//   }
//
//   private getNeuronAndLayerIndexes(nodeIndex: number): GetNeuronAndLayerIndexes {
//     if (typeof nodeIndex !== 'number') {
//       throw new Error('nodeIndex is not a number');
//     }
//
//     const neuronsPerLayer = 8;
//     const layerIndex = Math.trunc((nodeIndex - 1) / neuronsPerLayer) + 1;
//
//     let neuronIndex;
//     if (nodeIndex % neuronsPerLayer === 0) {
//       neuronIndex = neuronsPerLayer;
//     }
//     else {
//       neuronIndex = nodeIndex % neuronsPerLayer;
//     }
//
//     return {
//       neuronIndex,
//       layerIndex,
//     };
//   }
//
//   private getSelectedNeurons() {
//     const {selectedNodes} = playgroundFacade;
//
//     let targets; // neuron or neurons
//
//     if (selectedNodes.length === 0) {
//       return;
//     }
//     else if (selectedNodes.length === 1) {
//       if (this.isOutputNode(selectedNodes[0])) {
//         targets = [this.getOutputNode()];
//       }
//       else {
//         targets = [this.getNeuron(selectedNodes[0]).neuron];
//       }
//     }
//     else {
//       targets = selectedNodes.map((i) => {
//         if (this.isOutputNode(i)) {
//           return this.getOutputNode();
//         }
//         return this.getNeuron(i).neuron;
//       });
//     }
//     return targets;
//   }
//
//   private resetLayerSelection() {
//     this.selectedLayerIndex = null;
//   }
//
//   private toggleLayer(index: number) {
//     const neurons = this.neurons[index];
//     neurons.forEach((neuron) => {
//       const nodeIndex = parseInt(neuron.id);
//       this.toggleNeuron(nodeIndex);
//       selectorDevice.setNeuronLight({
//         index: nodeIndex,
//         isDisabled: !neuron.isEnabled,
//       });
//       playgroundFacade.updateUI();
//     });
//   }
//
//   private toggleOutput(outputIndex: number) {
//     const link = this.output.inputLinks[outputIndex];
//     const willDie = !link.isDead;
//
//     if (link.source.isEnabled === true) {
//       link.isDead = willDie;
//
//       if (willDie === true) {
//         link.savedWeight = link.weight;
//         link.weight = 0;
//       }
//       else {
//         link.isDead = false;
//         link.weight = link.savedWeight || Math.random() - 0.5;
//       }
//     }
//   }
// }
