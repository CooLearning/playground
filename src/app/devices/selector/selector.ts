// import {networkState} from '../../state/network.state';
// import {networkUi} from '../../ui/network.ui';
// import {AbstractDevice} from '../device/abstract.device';
// import {layerCardUi} from '../../ui/layer-card.ui';
// import {playgroundUi} from '../../ui/playground.ui';
// import {PlaygroundFacadeNew} from '../../facades/playground.facade.new';
// import {SetNeuronOptions} from '../selector.device';
// import {SelectorInterface} from '../device/device.types';
//
// export class Selector extends AbstractDevice {
//   public settings: SelectorInterface;
//
//   private grid: number[][];
//
//   public setNeuronLight(options: SetNeuronOptions) {
//     if (!this.isInitialized) {
//       return;
//     }
//
//     const {index} = options;
//     const isSelected = options.isSelected || null;
//     const isDisabled = options.isDisabled || null;
//
//     let color;
//     if (isSelected) {
//       color = this.settings.colorByState.neuronSelected;
//     }
//     else if (isDisabled) {
//       color = this.settings.colorByState.neuronOff;
//     }
//     else {
//       color = this.settings.colorByState.neuronOn;
//     }
//
//     const {
//       neuronIndex,
//       layerIndex,
//     } = networkState.getNeuronAndLayerIndexes(index);
//
//     if (networkState.isOutputNode(options.index)) {
//       this.playNote({
//         note: this.settings.functionKeys.lastColumn[0],
//         color,
//       });
//       return;
//     }
//
//     const note = this.grid[layerIndex][neuronIndex - 1];
//
//     this.playNote({
//       note,
//       color,
//     });
//   }
//
//   public setInputLight(inputName: string, isEnabled: boolean) {
//     if (!this.isInitialized) {
//       return;
//     }
//
//     const map = {
//       x: 1,
//       y: 2,
//       xSquared: 3,
//       ySquared: 4,
//       xTimesY: 5,
//       sinX: 6,
//       sinY: 7,
//     };
//
//     const note = this.grid[0][map[inputName] - 1];
//
//     this.playNote({
//       note,
//       color: isEnabled ? this.settings.colorByState.inputOn : this.settings.colorByState.inputOff,
//     });
//   }
//
//   public renderLayers() {
//     if (!this.isInitialized) {
//       return;
//     }
//
//     const layerPads = this.settings.functionKeys.firstRow.slice(1, -1);
//     const index = networkState.selectedLayerIndex;
//
//     layerPads.forEach((_pad, pad) => {
//       if (index === pad) {
//         this.playNote({
//           note: _pad,
//           color: this.settings.colorByState.layerOn,
//         });
//       }
//       else {
//         this.playNote({
//           note: _pad,
//           color: this.settings.colorByState.layerOff,
//         });
//       }
//     });
//   }
//
//   public drawNeurons() {
//     const neuronsLength = networkState.neurons.flat().length;
//     for (let i = 1; i <= neuronsLength; ++i) {
//       const {
//         neuronIndex,
//         layerIndex,
//       } = networkState.getNeuronAndLayerIndexes(i);
//       const shiftedIndex = (layerIndex - 1) + 1; // reset, then move to the right
//       const note = this.grid[shiftedIndex][neuronIndex - 1];
//       const {isEnabled} = networkState.getNeuron(i);
//
//       this.playNote({
//         note,
//         color: isEnabled ? this.settings.colorByState.neuronOn : this.settings.colorByState.neuronOff,
//       });
//     }
//   }
//
//   private async init(device: any) {
//     if (this.isInitialized) {
//       this.reset();
//     }
//
//     this.isInitialized = false;
//
//     this.device = device;
//     this.settings = device.settings;
//     this.grid = this.settings.grid;
//
//     await this.runBootSequence();
//     this.drawGrid();
//     this.attachEvents();
//
//     this.isInitialized = true;
//   }
//
//   private attachEvents() {
//     this.removeListeners();
//     this.attachInputs();
//     this.attachNeurons();
//     this.attachOutputWeights();
//     this.attachNavigation();
//     this.attachLayers();
//   }
//
//   private attachInputs() {
//     this.addNoteListener('on', (e) => {
//       if (networkState.isLayerMode) {
//         return;
//       }
//
//       const flatIndex = this.getGridFlatIndex(e.note.number);
//
//       if (!(flatIndex >= 0 && flatIndex <= 6)) {
//         return;
//       }
//
//       const {id} = networkState.getInputByIndex(flatIndex);
//       networkUi.toggleInput(id);
//     });
//   }
//
//   private attachLayers() {
//     const layerPads = this.settings.functionKeys.firstRow.slice(1, -1);
//
//     // first draw
//     this.renderLayers();
//
//     let clickTimer;
//     // listen for changes
//     this.addControlListener((e) => {
//       const inputNote = e.controller.number;
//       const inputOn = e.value !== 0;
//       const inputOff = e.value === 0;
//       if (layerPads.indexOf(inputNote) !== -1) {
//         if (inputOn) {
//           // short click
//           const index = layerPads.indexOf(inputNote);
//           networkState.setLayer(index);
//           this.renderLayers();
//           controllerDevice.updateMode();
//           layerCardUi.updateCard();
//           playgroundUi.renderLayers();
//
//           // long click
//           clickTimer = setTimeout(() => {
//             // clear
//             clearTimeout(clickTimer);
//             clickTimer = null;
//             networkState.toggleLayer(index);
//             if (networkState.selectedLayerIndex !== null) {
//               networkState.resetLayerSelection();
//               this.renderLayers();
//               controllerDevice.updateMode();
//               layerCardUi.updateCard();
//               playgroundUi.renderLayers();
//             }
//           }, this.settings.time.longClick);
//         }
//
//         if (inputOff) {
//           if (clickTimer === null) {
//             return;
//           }
//           clearTimeout(clickTimer);
//           clickTimer = null;
//           this.removeNoteListeners('off');
//         }
//       }
//     });
//   }
//
//   private attachNavigation() {
//     this.attachPlayPauseButton();
//     this.attachOutputButton();
//   }
//
//   private attachNeurons() {
//     this.addNoteListener('on', (e) => {
//       if (networkState.isLayerMode) {
//         return;
//       }
//
//       const flatIndex = this.getGridFlatIndex(e.note.number);
//       if (!(flatIndex >= 8 && flatIndex <= 55)) {
//         return;
//       }
//
//       const nodeIndex = this.getGridFlatIndex(e.note.number) - 8 + 1;
//       const {isEnabled} = networkState.getNeuron(nodeIndex);
//
//       // short click only if enabled
//       if (isEnabled) {
//         if (PlaygroundFacadeNew.selectedNodes.indexOf(nodeIndex) === -1) {
//           networkUi.toggleNodeSelection(nodeIndex, true);
//         }
//         else {
//           networkUi.toggleNodeSelection(nodeIndex, false);
//         }
//       }
//
//       // long click
//       let clickTimer = setTimeout(() => {
//         // clear
//         clearTimeout(clickTimer);
//         clickTimer = null;
//         // payload
//         networkUi.toggleNodeSelection(nodeIndex, false);
//         networkUi.toggleNeuron(nodeIndex);
//       }, this.settings.time.longClick);
//
//       this.addNoteListener('off', () => {
//         if (clickTimer === null) {
//           return;
//         }
//         clearTimeout(clickTimer);
//         clickTimer = null;
//         this.removeNoteListeners('off');
//       });
//     });
//   }
//
//   private attachOutputButton() {
//     const note = this.settings.functionKeys.lastColumn[0];
//     const color = this.settings.colorByState.neuronOn;
//     const outputNode = networkState.getOutputNode();
//     const id = parseInt(outputNode.id);
//     const callback = () => {
//       if (PlaygroundFacadeNew.selectedNodes.indexOf(id) === -1) {
//         networkUi.toggleNodeSelection(id, true);
//       }
//       else {
//         networkUi.toggleNodeSelection(id, false);
//       }
//     };
//
//     this.addControlListener_NEW({
//       note,
//       callback,
//       isToggle: true,
//     });
//
//     this.addNoteListener_NEW({
//       note,
//       color,
//       callback,
//     });
//   }
//
//   private attachOutputWeights() {
//     this.addNoteListener('on', (e) => {
//       if (networkState.isLayerMode) {
//         return;
//       }
//
//       const flatIndex = this.getGridFlatIndex(e.note.number);
//       if (!(flatIndex >= 56 && flatIndex <= 63)) {
//         return;
//       }
//
//       const weights = networkState.output.inputLinks;
//       const index = flatIndex - 56;
//       networkState.toggleOutput(index);
//
//       const isEnabled = !weights[index].isDead
//         && weights[index].weight !== 0;
//
//       this.playNote({
//         note: e.note.number,
//         color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
//       });
//
//       PlaygroundFacadeNew.updateWeightsUI();
//     });
//   }
//
//   private attachPlayPauseButton() {
//     const playPauseButton = this.settings.functionKeys.lastColumn[this.settings.functionKeys.lastColumn.length - 1];
//
//     // handler
//     const handlePlayPause = (note) => {
//       const isPlaying = PlaygroundFacadeNew.togglePlayback();
//       this.playNote({
//         note,
//         color: isPlaying
//           ? this.settings.colorByState.playbackOn
//           : this.settings.colorByState.playbackOff,
//       });
//     };
//
//     // events
//     // can be either depending on the device (regular launchpad send controller event while mini launchpad sends note event)
//     this.addControlListener((e) => {
//       const inputNote = e.controller.number;
//       if (inputNote === playPauseButton) {
//         handlePlayPause(inputNote);
//       }
//     }, true);
//
//     this.addNoteListener_NEW({
//       note: playPauseButton,
//       color: PlaygroundFacadeNew.isPlaying
//         ? this.settings.colorByState.playbackOn
//         : this.settings.colorByState.playbackOff,
//       callback: (e) => {
//         handlePlayPause(e.note.number);
//       },
//     });
//   }
//
//   private drawGrid() {
//     this.drawInputs();
//     this.drawNeurons();
//     this.drawOutputWeights();
//   }
//
//   private drawInputs() {
//     for (let i = 0; i < networkState.inputs.length; ++i) {
//       this.playNote({
//         note: this.grid[0][i],
//         color: this.settings.colorByState.inputOn,
//       });
//     }
//   }
//
//   private drawOutputWeights() {
//     const outputWeights = networkState.output.inputLinks;
//     for (let i = 0; i < outputWeights.length; ++i) {
//       const note = this.grid[this.grid.length - 1][i];
//       const isEnabled = !outputWeights[i].isDead && outputWeights[i].weight !== 0;
//
//       this.playNote({
//         note,
//         color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
//       });
//     }
//   }
//
//   private getGridFlatIndex(note: number) {
//     return this.grid.flat().indexOf(note);
//   }
//
//   private updateLightPlayback() {
//     if (!this.isInitialized) {
//       return;
//     }
//
//     const isPlaying = PlaygroundFacadeNew.isPlaying;
//     const playbackPad = this.settings.functionKeys.lastColumn[this.settings.functionKeys.lastColumn.length - 1];
//     this.playNote({
//       note: playbackPad,
//       color: isPlaying
//         ? this.settings.colorByState.playbackOn
//         : this.settings.colorByState.playbackOff,
//     });
//   }
// }
