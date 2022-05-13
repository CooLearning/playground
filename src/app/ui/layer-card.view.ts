// import {AbstractCard} from './abstract.card';
// import {Store} from '../state/store';
// import {PlaygroundFacadeNew} from '../facades/playground.facade.new';
//
// export class LayerCardView extends AbstractCard {
//   public constructor(store: Store) {
//     super('#layer-card', store);
//     this.attachEvents();
//   }
//
//   public updateCard(): void {
//     if (this.store.network.selectedLayerIndex === null) {
//       this.node.style.display = 'none';
//       return;
//     }
//
//     this.node.style.display = 'flex';
//
//     const neurons = this.store.network.neurons[this.store.network.selectedLayerIndex];
//
//     neurons.forEach((neuron, index) => {
//       this.updateBias(index);
//       this.updateLearningRate(index);
//       this.updateActivation(index);
//       this.updateRegularizationType(index);
//       this.updateRegularizationRate(index);
//     });
//   }
//
//   private attachEvents() {
//     this.attachBiasesEvents();
//     this.attachLearningRatesEvents();
//     this.attachActivationsEvents();
//     this.attachRegularizationTypesEvents();
//     this.attachRegularizationRatesEvents();
//   }
//
//   private attachBiasesEvents() {
//     this.biases.forEach((bias, index) => {
//       bias.onchange = (e: InputEvent) => {
//         const value = parseFloat((e.target as HTMLInputElement).value);
//         const hasChanged = this.store.network.setBias(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//         bias.blur();
//       };
//     });
//   }
//
//   private attachLearningRatesEvents() {
//     this.learningRates.forEach((learningRate, index) => {
//       const select = learningRate.children[0] as HTMLSelectElement;
//
//       select.onchange = (e: InputEvent) => {
//         const value = parseFloat((e.target as HTMLInputElement).value);
//         const hasChanged = this.store.network.setLearningRate(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private attachActivationsEvents() {
//     this.activations.forEach((activation, index) => {
//       const select = activation.children[0] as HTMLSelectElement;
//
//       select.onchange = (e: InputEvent) => {
//         const value = (e.target as HTMLInputElement).value;
//         const hasChanged = this.store.network.setActivation(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private attachRegularizationTypesEvents() {
//     this.regularizations.forEach((regularization, index) => {
//       const select = regularization.children[0] as HTMLSelectElement;
//
//       select.onchange = (e: InputEvent) => {
//         const value = (e.target as HTMLInputElement).value;
//         const hasChanged = this.store.network.setRegularizationType(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private attachRegularizationRatesEvents() {
//     this.regularizationRates.forEach((regularizationRate, index) => {
//       const select = regularizationRate.children[0] as HTMLSelectElement;
//
//       select.onchange = (e: InputEvent) => {
//         const value = parseFloat((e.target as HTMLInputElement).value);
//         const hasChanged = this.store.network.setRegularizationRate(index, value);
//         if (hasChanged) {
//           PlaygroundFacadeNew.updateUI();
//         }
//       };
//     });
//   }
//
//   private updateBias(index) {
//     const neurons = this.store.network.neurons[this.store.network.selectedLayerIndex];
//     const neuron = neurons[index];
//
//     this.biases[index].value = neuron.bias.toFixed(3);
//     this.biases[index].disabled = !neuron.isEnabled;
//   }
//
//   private updateLearningRate(index) {
//     const neurons = this.store.network.neurons[this.store.network.selectedLayerIndex];
//
//     const neuron = neurons[index];
//     const option = this.learningRates[index].children[0] as HTMLOptionElement;
//
//     option.value = neuron.learningRate;
//     option.disabled = !neuron.isEnabled;
//   }
//
//   private updateActivation(index) {
//     const neurons = this.store.network.neurons[this.store.network.selectedLayerIndex];
//
//     const neuron = neurons[index];
//     const option = this.activations[index].children[0] as HTMLOptionElement;
//
//     option.value = neuron.activation.name;
//     option.disabled = !neuron.isEnabled;
//   }
//
//   private updateRegularizationType(index) {
//     const neurons = this.store.network.neurons[this.store.network.selectedLayerIndex];
//
//     const neuron = neurons[index];
//     const option = this.regularizations[index].children[0] as HTMLOptionElement;
//
//     option.value = neuron.regularization.name;
//     option.disabled = !neuron.isEnabled;
//   }
//
//   private updateRegularizationRate(index) {
//     const neurons = this.store.network.neurons[this.store.network.selectedLayerIndex];
//
//     const neuron = neurons[index];
//     const option = this.regularizationRates[index].children[0] as HTMLOptionElement;
//
//     option.value = neuron.regularizationRate;
//     option.disabled = !neuron.isEnabled;
//   }
// }
