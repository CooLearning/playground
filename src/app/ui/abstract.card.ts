// import {Store} from '../state/store';
//
// export abstract class AbstractCard {
//   protected node: HTMLDivElement;
//
//   protected rows: HTMLDivElement[];
//
//   protected store: Store;
//
//   protected biases: HTMLInputElement[];
//
//   protected learningRates: HTMLOptionElement[];
//
//   protected activations: HTMLDivElement[];
//
//   protected regularizations: HTMLDivElement[];
//
//   protected regularizationRates: HTMLDivElement[];
//
//   protected weights: HTMLDivElement[];
//
//   private selectors = {
//     node: '#select-card',
//     row: 'div.row:not(.header)',
//     weight: 'input.weight',
//     bias: 'input.bias',
//     learningRate: 'div.learning-rate',
//     activation: 'div.activation',
//     regularization: 'div.regularization',
//     regularizationRate: 'div.regularization-rate',
//   };
//
//   private options = {
//     learningRate: [0, 0.00001, 0.0001, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
//     activation: ['relu', 'tanh', 'sigmoid', 'linear'],
//     regularization: ['none', 'L1', 'L2'],
//     regularizationRate: [0, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
//   };
//
//   protected constructor(nodeSelector: string, store: Store) {
//     this.store = store;
//
//     this.fetchCard(nodeSelector);
//     this.createLearningRates();
//     this.createActivations();
//     this.createRegularizations();
//     this.createRegularizationRates();
//   }
//
//   protected updateSourceActivation(index, activation?) {
//     this.updateSourceDropdown(this.activations, index, activation);
//   }
//
//   protected updateSourceBias(index, bias?) {
//     this.updateSourceInput(this.biases, index, bias);
//     if (bias > 1 || bias < -1) {
//       this.biases[index].style.backgroundColor = 'rgba(255,0,0,.2)';
//     }
//     else {
//       this.biases[index].style.backgroundColor = null;
//     }
//   }
//
//   protected updateSourceLearningRate(index, learningRate?) {
//     this.updateSourceDropdown(this.learningRates, index, learningRate);
//   }
//
//   protected updateSourceRegularizationRate(index, regularizationRate?) {
//     this.updateSourceDropdown(this.regularizationRates, index, regularizationRate);
//   }
//
//   protected updateSourceRegularizationType(index, regularization?) {
//     this.updateSourceDropdown(this.regularizations, index, regularization);
//   }
//
//   protected updateSourceWeight(index, weight?) {
//     this.updateSourceInput(this.weights, index, weight);
//     if (weight > 1 || weight < -1) {
//       this.weights[index].style.backgroundColor = 'rgba(255,0,0,.2)';
//     }
//     else {
//       this.weights[index].style.backgroundColor = null;
//     }
//   }
//
//   private fetchCard(nodeSelector: string) {
//     this.node = document.querySelector(nodeSelector);
//     this.rows = Array.from(this.node.querySelectorAll(this.selectors.row));
//     this.weights = Array.from(this.node.querySelectorAll(this.selectors.weight));
//     this.biases = Array.from(this.node.querySelectorAll(this.selectors.bias));
//     this.learningRates = Array.from(this.node.querySelectorAll(this.selectors.learningRate));
//     this.activations = Array.from(this.node.querySelectorAll(this.selectors.activation));
//     this.regularizations = Array.from(this.node.querySelectorAll(this.selectors.regularization));
//     this.regularizationRates = Array.from(this.node.querySelectorAll(this.selectors.regularizationRate));
//   }
//
//   private createActivations() {
//     this.activations.forEach((activation) => {
//       this.createOptions(activation, this.options.activation);
//     });
//   }
//
//   private createLearningRates() {
//     this.learningRates.forEach((learningRate) => {
//       this.createOptions(learningRate, this.options.learningRate);
//     });
//   }
//
//   private createOptions(parent, options) {
//     const select = document.createElement('select');
//
//     options.forEach((option) => {
//       const optionElement = document.createElement('option');
//       optionElement.value = option;
//       optionElement.innerText = option;
//       select.appendChild(optionElement);
//     });
//
//     parent.appendChild(select);
//   }
//
//   private createRegularizationRates() {
//     this.regularizationRates.forEach((regularizationRate) => {
//       this.createOptions(regularizationRate, this.options.regularizationRate);
//     });
//   }
//
//   private createRegularizations() {
//     this.regularizations.forEach((regularization) => {
//       this.createOptions(regularization, this.options.regularization);
//     });
//   }
//
//   private updateSourceDropdown(pool, index, payload) {
//     const didNotChange = pool[index].children[0].value === payload;
//     if (didNotChange) {
//       return;
//     }
//
//     if (typeof payload === 'undefined') {
//       pool[index].children[0].disabled = true;
//       pool[index].children[0].value = null;
//     }
//     else if (payload === null) {
//       pool[index].children[0].disabled = false;
//       pool[index].children[0].value = null;
//     }
//     else {
//       pool[index].children[0].disabled = false;
//       pool[index].children[0].value = payload;
//     }
//   }
//
//   private updateSourceInput(pool, index, payload) {
//     const isFocused = pool[index] === document.activeElement;
//     if (isFocused) {
//       return;
//     }
//
//     if (typeof payload === 'undefined') {
//       pool[index].disabled = true;
//       pool[index].value = null;
//     }
//     else if (payload === null) {
//       pool[index].disabled = false;
//       pool[index].value = null;
//     }
//     else {
//       pool[index].disabled = false;
//       pool[index].value = payload.toFixed(3);
//     }
//   }
// }
