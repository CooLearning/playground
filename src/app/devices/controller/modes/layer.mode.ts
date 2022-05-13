// import {networkState} from '../../../state/network.state';
// import {AbstractMode} from './abstract.mode';
// import {rangeMap} from '../../../utils/range-map';
// import {selectCardUi} from '../../../ui/select-card.ui';
// import {layerCardUi} from '../../../ui/layer-card.ui';
// import {Controller} from '../controller';
// import {PlaygroundFacadeNew} from '../../../facades/playground.facade.new';
//
// export class LayerMode implements AbstractMode {
//   public color: number;
//
//   private controller: Controller;
//
//   constructor(controller: Controller) {
//     this.controller = controller;
//     this.color = this.controller.settings.colorByState.layerMode;
//   }
//
//   public render(): void {
//     this.lightActiveNeurons();
//     this.attachButtons();
//     this.attachFaders();
//   }
//
//   private lightActiveNeurons() {
//     setTimeout(() => {
//       const neurons = networkState.neurons[networkState.selectedLayerIndex];
//       neurons.forEach((neuron) => {
//         if (neuron.isEnabled === true) {
//           const {neuronIndex} = networkState.getNeuronAndLayerIndexes(parseInt(neuron.id));
//           this.controller.playNote({
//             note: this.controller.settings.rows.firstButtons[neuronIndex - 1],
//             color: this.controller.settings.colorByState.selectMode,
//           });
//           this.controller.playNote({
//             note: this.controller.settings.rows.secondButtons[neuronIndex - 1],
//             color: this.controller.settings.colorByState.selectMode,
//           });
//         }
//       });
//     }, this.controller.settings.time.wait);
//   }
//
//   private attachButtons() {
//     this.controller.addNoteListener('on', (e) => {
//       const inputNote = e.note.number;
//       const index = this.controller.settings.rows.secondButtons.indexOf(inputNote);
//       if (index !== -1) {
//         this.controller.shifted[index] = true;
//         this.controller.playNote({
//           note: inputNote,
//           color: this.controller.settings.colorByState.shift,
//         });
//       }
//     });
//
//     this.controller.addNoteListener('off', (e) => {
//       const inputNote = e.note.number;
//       const index = this.controller.settings.rows.secondButtons.indexOf(inputNote);
//       if (index !== -1) {
//         this.controller.shifted[index] = false;
//         this.controller.playNote({
//           note: inputNote,
//           color: this.controller.settings.colorByState.layerMode,
//         });
//       }
//     });
//   }
//
//   private attachFaders() {
//     const neurons = networkState.neurons[networkState.selectedLayerIndex];
//
//     // todo: split
//     this.controller.addControlListener((e) => {
//       const inputNote = e.controller.number;
//
//       // learning rate
//       if (this.controller.settings.rows.firstPots.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.firstPots.indexOf(inputNote);
//         if (neurons[index].isEnabled === false) {
//           return;
//         }
//
//         const learningRateOptionIndex = parseInt(
//           rangeMap(
//             e.value,
//             0,
//             127,
//             0,
//             selectCardUi.options.learningRate.length - 1,
//           ).toString(),
//         );
//
//         const learningRate = selectCardUi.options.learningRate[learningRateOptionIndex];
//
//         const hasChanged = networkState.setLearningRate(index, learningRate);
//         if (hasChanged) {
//           layerCardUi.updateLearningRate(index, learningRate);
//           PlaygroundFacadeNew.updateUI();
//         }
//       }
//       // activation
//       else if (this.controller.settings.rows.secondPots.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.secondPots.indexOf(inputNote);
//         if (neurons[index].isEnabled === false) {
//           return;
//         }
//
//         const activationOptionIndex = parseInt(
//           rangeMap(
//             e.value,
//             0,
//             127,
//             0,
//             selectCardUi.options.activation.length - 1,
//           ).toString(),
//         );
//
//         const activation = selectCardUi.options.activation[activationOptionIndex];
//
//         const hasChanged = networkState.setActivation(index, activation);
//         if (hasChanged) {
//           layerCardUi.updateActivation(index);
//           PlaygroundFacadeNew.updateUI();
//         }
//       }
//       else if (this.controller.settings.rows.thirdPots.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.thirdPots.indexOf(inputNote);
//         if (neurons[index].isEnabled === false) {
//           return;
//         }
//
//         // regularization type (shifted)
//         if (this.controller.shifted[index] === true) {
//           const regularizationOptionIndex = parseInt(
//             rangeMap(
//               e.value,
//               0,
//               127,
//               0,
//               selectCardUi.options.regularization.length - 1,
//             ).toString(),
//           );
//
//           const regularization = selectCardUi.options.regularization[regularizationOptionIndex];
//
//           const hasChanged = networkState.setRegularizationType(index, regularization);
//           if (hasChanged) {
//             layerCardUi.updateRegularizationType(index);
//             PlaygroundFacadeNew.updateUI();
//           }
//         }
//         // regularization rate
//         else {
//           const regularizationRateOptionIndex = parseInt(
//             rangeMap(
//               e.value,
//               0,
//               127,
//               0,
//               selectCardUi.options.regularizationRate.length - 1,
//             ).toString(),
//           );
//
//           const regularizationRate = selectCardUi.options.regularizationRate[regularizationRateOptionIndex];
//
//           const hasChanged = networkState.setRegularizationRate(index, regularizationRate);
//           if (hasChanged) {
//             layerCardUi.updateRegularizationRate(index);
//             PlaygroundFacadeNew.updateUI();
//           }
//         }
//       }
//       // bias
//       else if (this.controller.settings.rows.faders.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.faders.indexOf(inputNote);
//         if (neurons[index].isEnabled === false) {
//           return;
//         }
//         const value = rangeMap(e.value, 0, 127, -1, 1);
//         const hasChanged = networkState.setBias(index, value);
//         if (hasChanged) {
//           layerCardUi.updateBias(index);
//           PlaygroundFacadeNew.updateBiasesUI();
//         }
//       }
//     });
//   }
// }
