import {devicePrototype} from './device/device.prototype';
import {playgroundFacade} from '../facades/playground.facade';
import {networkState} from '../state/network.state';
import {networkUi} from '../ui/network.ui';
import {layerCardUi} from '../ui/layer-card.ui';
import {controllerDevice} from './controller.device';
import {playgroundUi} from '../ui/playground.ui';

export const selectorDevice = Object.create(devicePrototype);

selectorDevice.grid = null as number[][];

/**
 * Initialize the selector
 *
 * @param {*} device - The device to initialize
 */
selectorDevice.init = async function(device: any): Promise<void> {
  if (this.isInitialized) {
    this.reset();
  }

  this.isInitialized = false;

  this.device = device;
  this.settings = device.settings;
  this.grid = this.settings.grid;

  await this.runBootSequence();
  this.drawGrid();
  this.attachEvents();

  this.isInitialized = true;
};

/**
 * First draw of the neural network
 */
selectorDevice.drawGrid = function(): void {
  this.drawInputs();
  this.drawNeurons();
  this.drawOutputWeights();
};

/**
 * Attach events to the grid
 */
selectorDevice.attachEvents = function(): void {
  this.removeListeners();
  this.attachInputs();
  this.attachNeurons();
  this.attachOutputWeights();
  this.attachNavigation();
  this.attachLayers();
};

/**
 * Draw the inputs
 */
selectorDevice.drawInputs = function(): void {
  for (let i = 0; i < networkState.inputs.length; ++i) {
    this.playNote({
      note: this.grid[0][i],
      color: this.settings.colorByState.inputOn,
    });
  }
};

/**
 * Attach events to the inputs
 */
selectorDevice.attachInputs = function(): void {
  this.addNoteListener('on', (e) => {
    if (networkState.isLayerMode) {
      return;
    }

    const flatIndex = this.getGridFlatIndex(e.note.number);

    if (!(flatIndex >= 0 && flatIndex <= 6)) {
      return;
    }

    const {id} = networkState.getInputByIndex(flatIndex);
    networkUi.toggleInput(id);
  });
};

/**
 * Setter for the input
 *
 * @param {string} inputName - The name of the input
 * @param {boolean} isEnabled - The state of the input
 */
selectorDevice.setInputLight = function(inputName: string, isEnabled: boolean): void {
  if (!this.isInitialized) {
    return;
  }

  const map = {
    x: 1,
    y: 2,
    xSquared: 3,
    ySquared: 4,
    xTimesY: 5,
    sinX: 6,
    sinY: 7,
  };

  const note = this.grid[0][map[inputName] - 1];

  this.playNote({
    note,
    color: isEnabled ? this.settings.colorByState.inputOn : this.settings.colorByState.inputOff,
  });
};

/**
 * Draw the neurons
 */
selectorDevice.drawNeurons = function(): void {
  const neuronsLength = networkState.neurons.flat().length;
  for (let i = 1; i <= neuronsLength; ++i) {
    const {
      neuronIndex,
      layerIndex,
    } = networkState.getNeuronAndLayerIndexes(i);
    const shiftedIndex = (layerIndex - 1) + 1; // reset, then move to the right
    const note = this.grid[shiftedIndex][neuronIndex - 1];
    const {isEnabled} = networkState.getNeuron(i);

    this.playNote({
      note,
      color: isEnabled ? this.settings.colorByState.neuronOn : this.settings.colorByState.neuronOff,
    });
  }
};

/**
 * Attach events to the neurons
 */
selectorDevice.attachNeurons = function(): void {
  this.addNoteListener('on', (e) => {
    if (networkState.isLayerMode) {
      return;
    }

    const flatIndex = this.getGridFlatIndex(e.note.number);
    if (!(flatIndex >= 8 && flatIndex <= 55)) {
      return;
    }

    const nodeIndex = this.getGridFlatIndex(e.note.number) - 8 + 1;
    const {isEnabled} = networkState.getNeuron(nodeIndex);

    // short click only if enabled
    if (isEnabled) {
      if (playgroundFacade.selectedNodes.indexOf(nodeIndex) === -1) {
        networkUi.toggleNodeSelection(nodeIndex, true);
      }
      else {
        networkUi.toggleNodeSelection(nodeIndex, false);
      }
    }

    // long click
    let clickTimer = setTimeout(() => {
      // clear
      clearTimeout(clickTimer);
      clickTimer = null;
      // payload
      networkUi.toggleNodeSelection(nodeIndex, false);
      networkUi.toggleNeuron(nodeIndex);
    }, this.settings.time.longClick);

    this.addNoteListener('off', () => {
      if (clickTimer === null) {
        return;
      }
      clearTimeout(clickTimer);
      clickTimer = null;
      this.removeNoteListeners('off');
    });
  });
};

type SetNeuronOptions = {
  index: number;
  isSelected?: boolean;
  isDisabled?: boolean;
}

/**
 * Setter for the neuron
 *
 * @param {SetNeuronOptions} options - The options
 */
selectorDevice.setNeuronLight = function(options: SetNeuronOptions): void {
  if (!this.isInitialized) {
    return;
  }

  const {index} = options;
  const isSelected = options.isSelected || null;
  const isDisabled = options.isDisabled || null;

  const {
    neuronIndex,
    layerIndex,
  } = networkState.getNeuronAndLayerIndexes(index);
  const note = this.grid[layerIndex][neuronIndex - 1];

  let color;
  if (isSelected) {
    color = this.settings.colorByState.neuronSelected;
  }
  else if (isDisabled) {
    color = this.settings.colorByState.neuronOff;
  }
  else {
    color = this.settings.colorByState.neuronOn;
  }

  this.playNote({
    note,
    color,
  });
};

/**
 * Draw the output weights
 */
selectorDevice.drawOutputWeights = function(): void {
  const outputWeights = networkState.output.inputLinks;
  for (let i = 0; i < outputWeights.length; ++i) {
    const note = this.grid[this.grid.length - 1][i];
    const isEnabled = !outputWeights[i].isDead && outputWeights[i].weight !== 0;

    this.playNote({
      note,
      color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
    });
  }
};

/**
 * Attach events to the output weights
 */
selectorDevice.attachOutputWeights = function(): void {
  this.addNoteListener('on', (e) => {
    if (networkState.isLayerMode) {
      return;
    }

    const flatIndex = this.getGridFlatIndex(e.note.number);
    if (!(flatIndex >= 56 && flatIndex <= 63)) {
      return;
    }

    const weights = networkState.output.inputLinks;
    const index = flatIndex - 56;
    networkState.toggleOutput(index);

    const isEnabled = !weights[index].isDead
      && weights[index].weight !== 0;

    this.playNote({
      note: e.note.number,
      color: isEnabled ? this.settings.colorByState.outputWeightOn : this.settings.colorByState.outputWeightOff,
    });

    playgroundFacade.updateWeightsUI();
  });
};

/**
 * Utility function to get the flat index of a note
 *
 * @param {number} note - The note to get the flat index of
 * @returns {number} The flat index of the note
 */
selectorDevice.getGridFlatIndex = function(note: number): number {
  return this.grid.flat().indexOf(note);
};

/**
 * Attach navigation buttons
 */
selectorDevice.attachNavigation = function(): void {
  this.attachPlayPauseButton();
};

selectorDevice.attachPlayPauseButton = function() {
  const playPauseButton = this.settings.functionKeys.lastColumn[this.settings.functionKeys.lastColumn.length - 1];

  // handler
  const handlePlayPause = (note) => {
    const isPlaying = playgroundFacade.togglePlayback();
    this.playNote({
      note,
      color: isPlaying
        ? this.settings.colorByState.playbackOn
        : this.settings.colorByState.playbackOff,
    });
  };

  // events
  // can be either depending on the device (regular launchpad send controller event while mini launchpad sends note event)
  this.addControlListener((e) => {
    const inputNote = e.controller.number;
    if (inputNote === playPauseButton) {
      handlePlayPause(inputNote);
    }
  }, true);

  this.addNoteListener_NEW({
    note: playPauseButton,
    color: playgroundFacade.isPlaying
      ? this.settings.colorByState.playbackOn
      : this.settings.colorByState.playbackOff,
    callback: (e) => {
      handlePlayPause(e.note.number);
    },
  });
};

/**
 * Attach layer buttons
 */
selectorDevice.attachLayers = function(): void {
  const layerPads = this.settings.functionKeys.firstRow.slice(1, -1);

  // first draw
  this.renderLayers();

  let clickTimer;
  // listen for changes
  this.addControlListener((e) => {
    const inputNote = e.controller.number;
    const inputOn = e.value !== 0;
    const inputOff = e.value === 0;
    if (layerPads.indexOf(inputNote) !== -1) {
      if (inputOn) {
        // short click
        const index = layerPads.indexOf(inputNote);
        networkState.setLayer(index);
        this.renderLayers();
        controllerDevice.updateMode();
        layerCardUi.updateCard();
        playgroundUi.renderLayers();

        // long click
        clickTimer = setTimeout(() => {
          // clear
          clearTimeout(clickTimer);
          clickTimer = null;
          networkState.toggleLayer(index);
          if (networkState.selectedLayerIndex !== null) {
            networkState.resetLayerSelection();
            this.renderLayers();
            controllerDevice.updateMode();
            layerCardUi.updateCard();
            playgroundUi.renderLayers();
          }
        }, this.settings.time.longClick);
      }

      if (inputOff) {
        if (clickTimer === null) {
          return;
        }
        clearTimeout(clickTimer);
        clickTimer = null;
        this.removeNoteListeners('off');
      }
    }
  });
};

/**
 * Update the light for playback button
 */
selectorDevice.updateLightPlayback = function(): void {
  if (!this.isInitialized) {
    return;
  }

  const isPlaying = playgroundFacade.isPlaying;
  const playbackPad = this.settings.functionKeys.lastColumn[this.settings.functionKeys.lastColumn.length - 1];
  this.playNote({
    note: playbackPad,
    color: isPlaying
      ? this.settings.colorByState.playbackOn
      : this.settings.colorByState.playbackOff,
  });
};

/**
 * Render the layer buttons
 */
selectorDevice.renderLayers = function(): void {
  if (!this.isInitialized) {
    return;
  }

  const layerPads = this.settings.functionKeys.firstRow.slice(1, -1);
  const index = networkState.selectedLayerIndex;

  layerPads.forEach((_pad, pad) => {
    if (index === pad) {
      this.playNote({
        note: _pad,
        color: this.settings.colorByState.layerOn,
      });
    }
    else {
      this.playNote({
        note: _pad,
        color: this.settings.colorByState.layerOff,
      });
    }
  });
};
