// import {AbstractMode} from './abstract.mode';
// import {networkState} from '../../../state/network.state';
// import {rangeMap} from '../../../utils/range-map';
// import {selectCardUi} from '../../../ui/select-card.ui';
// import {Controller} from '../controller';
// import {PlaygroundFacadeNew} from '../../../facades/playground.facade.new';
//
// export class SelectMode implements AbstractMode {
//   public color: number;
//
//   private controller: Controller;
//
//   private selectedNodes: number[];
//
//   constructor(controller: Controller) {
//     this.controller = controller;
//     this.color = this.controller.settings.colorByState.selectMode;
//     this.selectedNodes = PlaygroundFacadeNew.selectedNodes;
//   }
//
//   public render(): void {
//     this.selectedNodes.forEach((node) => {
//       this.attachButtons();
//       this.attachControls(node);
//     });
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
//           color: this.controller.settings.colorByState.selectMode,
//         });
//       }
//     });
//   }
//
//   private attachControls(selectedNode: number): void {
//     let neuron;
//
//     if (networkState.isOutputNode(selectedNode)) {
//       neuron = networkState.getOutputNode();
//     }
//     else {
//       neuron = networkState.getNeuron(selectedNode).neuron;
//     }
//
//     const links = neuron.inputLinks;
//
//     // first draw
//     setTimeout(() => {
//       links.forEach((link, index) => {
//         link.hasSnapped = false;
//         this.controller.playNote({
//           note: this.controller.settings.rows.firstButtons[index],
//           color: this.controller.settings.colorByState.unsnap,
//         });
//       });
//     }, this.controller.settings.time.wait);
//
//     // listen to changes
//     this.controller.addControlListener((e) => {
//       const inputNote = e.controller.number;
//
//       // first row: learning rate
//       if (this.controller.settings.rows.firstPots.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.firstPots.indexOf(inputNote);
//         if (typeof links[index]?.source === 'undefined') {
//           return;
//         }
//         if (links[index].source.isEnabled === false) {
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
//         const hasChanged = networkState.setSourceLearningRate(index, learningRate);
//         if (hasChanged) {
//           selectCardUi.updateSourceLearningRate(index, learningRate);
//           PlaygroundFacadeNew.updateUI();
//         }
//       }
//       // second row: activation
//       else if (this.controller.settings.rows.secondPots.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.secondPots.indexOf(inputNote);
//         if (typeof links[index]?.source === 'undefined') {
//           return;
//         }
//         if (links[index].source.isEnabled === false) {
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
//         const hasChanged = networkState.setSourceActivation(index, activation);
//         if (hasChanged) {
//           selectCardUi.updateSourceActivation(index, activation);
//           PlaygroundFacadeNew.updateUI();
//         }
//       }
//       // third row: regularization (shifted) + regularization rate
//       else if (this.controller.settings.rows.thirdPots.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.thirdPots.indexOf(inputNote);
//         if (typeof links[index]?.source === 'undefined') {
//           return;
//         }
//         if (links[index].source.isEnabled === false) {
//           return;
//         }
//
//         // regularization (shifted)
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
//           const hasChanged = networkState.setSourceRegularizationType(index, regularization);
//           if (hasChanged) {
//             selectCardUi.updateSourceRegularizationType(index, regularization);
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
//           const hasChanged = networkState.setSourceRegularizationRate(index, regularizationRate);
//           if (hasChanged) {
//             selectCardUi.updateSourceRegularizationRate(index, regularizationRate);
//             PlaygroundFacadeNew.updateUI();
//           }
//         }
//       }
//       // faders: weights + biases (shifted)
//       else if (this.controller.settings.rows.faders.indexOf(inputNote) !== -1) {
//         const index = this.controller.settings.rows.faders.indexOf(inputNote);
//         if (typeof links[index]?.source === 'undefined') {
//           return;
//         }
//         if (links[index].source.isEnabled === false) {
//           return;
//         }
//
//         // weights
//         if (this.controller.shifted[index] === false) {
//           // compute the new value
//           // intentionally use 2 decimals to avoid high frequency changes
//           const value = parseFloat(
//             rangeMap(e.value, 0, 127, -1, 1)
//               .toFixed(2),
//           );
//
//           if (value.toFixed(1) === links[index].weight.toFixed(1)) {
//             // snap
//             links[index].hasSnapped = true;
//
//             // automatic unsnap
//             if (links[index].snapTimer) {
//               clearTimeout(links[index].snapTimer);
//             }
//
//             links[index].snapTimer = setTimeout(() => {
//               links[index].hasSnapped = false;
//               this.controller.playNote({
//                 note: this.controller.settings.outputByInput[inputNote],
//                 color: this.controller.settings.colorByState.unsnap,
//               });
//             }, 800);
//           }
//
//           if (links[index].hasSnapped) {
//             const hasChanged = networkState.setSourceWeight(index, value);
//             if (hasChanged) {
//               selectCardUi.updateSourceWeight(index, value);
//               PlaygroundFacadeNew.updateWeightsUI();
//             }
//             this.controller.playNote({
//               note: this.controller.settings.outputByInput[inputNote],
//               color: this.controller.settings.colorByState.snap,
//             });
//           }
//           else {
//             this.controller.playNote({
//               note: this.controller.settings.outputByInput[inputNote],
//               color: this.controller.settings.colorByState.unsnap,
//             });
//           }
//         }
//         // biases
//         else {
//           const value = rangeMap(e.value, 0, 127, -1, 1);
//           const hasChanged = networkState.setSourceBias(index, value);
//           if (hasChanged) {
//             selectCardUi.updateSourceBias(index, value);
//             PlaygroundFacadeNew.updateBiasesUI();
//           }
//         }
//       }
//     });
//   }
// }
