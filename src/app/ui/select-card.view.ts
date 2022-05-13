// import {AbstractCard} from './abstract.card';
// import {Store} from '../state/store';
// import {PlaygroundFacadeNew} from '../facades/playground.facade.new';
//
// export class SelectCardView extends AbstractCard {
//   public constructor(state: Store) {
//     super('#select-card', state);
//     this.attachEvents();
//   }
//
//   public updateCard(): void {
//     const {selectedNodes} = PlaygroundFacadeNew;
//     if (selectedNodes.length === 0) {
//       this.node.style.display = 'none';
//       return;
//     }
//
//     this.node.style.display = 'flex';
//
//     this.rows.forEach((_row, index) => {
//       // single selection
//       if (selectedNodes.length === 1) {
//         let link;
//
//         if (this.store.network.isOutputNode(selectedNodes[0])) {
//           link = this.store.network.getOutputNode().inputLinks[index];
//         }
//         else {
//           link = this.store.network.getNeuron(selectedNodes[0]).neuron.inputLinks[index];
//         }
//
//         if (typeof link === 'undefined') {
//           this.updateSourceWeight(index);
//           this.updateSourceBias(index);
//           this.updateSourceLearningRate(index);
//           this.updateSourceActivation(index);
//           this.updateSourceRegularizationType(index);
//           this.updateSourceRegularizationRate(index);
//           return;
//         }
//
//         const weight = link.weight;
//         const bias = link.source.bias;
//
//         if (link.isDead === true) {
//           this.updateSourceWeight(index);
//           this.updateSourceBias(index);
//           this.updateSourceLearningRate(index);
//           this.updateSourceActivation(index);
//           this.updateSourceRegularizationType(index);
//           this.updateSourceRegularizationRate(index);
//         }
//         else {
//           this.updateSourceWeight(index, weight);
//           this.updateSourceBias(index, bias);
//           this.updateSourceLearningRate(index, link.source.learningRate);
//           this.updateSourceActivation(index, link.source.activation.name);
//           this.updateSourceRegularizationType(index, link.source.regularization.name);
//           this.updateSourceRegularizationRate(index, link.source.regularizationRate);
//         }
//       }
//       // multi selection
//       else {
//         this.updateSourceWeight(index, null);
//         this.updateSourceBias(index, null);
//         this.updateSourceLearningRate(index, null);
//         this.updateSourceActivation(index, null);
//         this.updateSourceRegularizationType(index, null);
//         this.updateSourceRegularizationRate(index, null);
//       }
//     });
//
//     // dumb refresh if only one node is selected
//     if (selectedNodes.length === 1) {
//       requestAnimationFrame(() => this.updateCard());
//     }
//   }
//
//   private attachEvents() {
//     this.attachSourceWeightsEvents();
//     this.attachSourceBiasesEvents();
//     this.attachSourceLearningRatesEvents();
//     this.attachSourceActivationsEvents();
//     this.attachSourceRegularizationTypesEvents();
//     this.attachSourceRegularizationRatesEvents();
//   }
//
//   private attachSourceActivationsEvents() {
//     this.activations.forEach((activation, index) => {
//       const select = activation.children[0] as HTMLSelectElement;
//       select.onchange = (e: InputEvent) => {
//         const value = (e.target as HTMLInputElement).value;
//         const hasChanged = this.store.network.setSourceActivation(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private attachSourceBiasesEvents() {
//     this.biases.forEach((bias, index) => {
//       bias.onchange = (e: InputEvent) => {
//         const value = parseFloat((e.target as HTMLInputElement).value);
//         const hasChanged = this.store.network.setSourceBias(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateBiasesUI();
//         }
//         bias.blur();
//       };
//     });
//   }
//
//   private attachSourceLearningRatesEvents() {
//     this.learningRates.forEach((learningRate, index) => {
//       const select = learningRate.children[0] as HTMLSelectElement;
//       select.onchange = (e: InputEvent) => {
//         const value = parseFloat((e.target as HTMLInputElement).value);
//         const hasChanged = this.store.network.setSourceLearningRate(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private attachSourceRegularizationRatesEvents() {
//     this.regularizationRates.forEach((regularizationRate, index) => {
//       const select = regularizationRate.children[0] as HTMLSelectElement;
//       select.onchange = (e: InputEvent) => {
//         const value = parseFloat((e.target as HTMLInputElement).value);
//         const hasChanged = this.store.network.setSourceRegularizationRate(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private attachSourceRegularizationTypesEvents() {
//     this.regularizations.forEach((regularization, index) => {
//       const select = regularization.children[0] as HTMLSelectElement;
//       select.onchange = (e: InputEvent) => {
//         const value = (e.target as HTMLInputElement).value;
//         const hasChanged = this.store.network.setSourceRegularizationType(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private attachSourceWeightsEvents() {
//     this.weights.forEach((weight, index) => {
//       weight.onchange = (e: InputEvent) => {
//         const value = parseFloat((e.target as HTMLInputElement).value);
//         const hasChanged = this.store.network.setSourceWeight(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateWeightsUI();
//         }
//         weight.blur();
//       };
//     });
//   }
// }
