import {devicePrototype} from './device/device.prototype';
import {rangeMap} from '../utils/range-map';
import {playgroundFacade} from '../facades/playground.facade';
import {selectCardUi} from '../ui/select-card.ui';
import {networkState} from '../state/network.state';
import {mappingsState} from '../state/mappings.state';
import {mappingsUi} from '../ui/mappings.ui';
import {playgroundUi} from '../ui/playground.ui';
import {layerCardUi} from '../ui/layer-card.ui';

/**
 * Controller is a unique device that controls the playground.
 */
export const controllerDevice = Object.create(devicePrototype);

controllerDevice.shifted = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
};

/**
 * Initialize the controller.
 *
 * @param {*} device - The device to initialize.
 * @returns {Promise<void>}
 */
controllerDevice.init = async function(device: any): Promise<void> {
  if (this.isInitialized) {
    this.removeListeners();
  }

  this.isInitialized = false;

  this.device = device;
  this.settings = device.settings;

  await this.runBootSequence();
  this.isInitialized = true;

  this.updateMode();
};

/**
 * Get the current mode color.
 *
 * @returns {number} Color value.
 */
controllerDevice.getModeColor = function(): number {
  if (networkState.isLayerMode) {
    return this.settings.colorByState.layerMode;
  }
  else if (this.isSingleMode || this.isMultipleMode) {
    return this.settings.colorByState.selectMode;
  }
  else {
    return this.settings.colorByState.defaultMode;
  }
};

/**
 * Draw all lights.
 */
controllerDevice.drawLights = function(): void {
  if (!this.isInitialized) {
    return;
  }

  this.playNotes({
    firstNote: this.settings.lights.first,
    lastNote: this.settings.lights.last,
    color: this.getModeColor(),
  });
};

/**
 * Set the mode of the controller.
 */
controllerDevice.updateMode = function(): void {
  if (!this.isInitialized) {
    return;
  }

  this.removeListeners();
  this.drawLights();

  if (networkState.isLayerMode) {
    this.setLayerMode();
  }
  else if (this.isDefaultMode) {
    this.setDefaultMode();
  }
  else if (this.isSingleMode) {
    this.setSingleMode();
  }
  else if (this.isMultipleMode) {
    this.setMultipleMode();
  }
};

/**
 * Set the default mode.
 */
controllerDevice.setDefaultMode = function(): void {
  this.attachButtonsDefault();
  this.attachControlsDefault();
};

/**
 * Set the single mode.
 */
controllerDevice.setSingleMode = function(): void {
  const node = playgroundFacade.selectedNodes[0];
  this.attachButtonsToNeuron();
  this.attachControlsToNeuron(node);
};

/**
 * Set the multiple mode.
 */
controllerDevice.setMultipleMode = function(): void {
  const {selectedNodes} = playgroundFacade;
  selectedNodes.forEach((node) => {
    this.attachButtonsToNeuron();
    this.attachControlsToNeuron(node);
  });
};

/**
 * This is called when selection is made.
 */
controllerDevice.onSelectionEvent = function(): void {
  if (!this.isInitialized) {
    return;
  }

  setTimeout(() => {
    this.updateMode();
  }, this.settings.time.wait);
};

/**
 * Attach buttons for the default mode.
 */
controllerDevice.attachButtonsDefault = function(): void {
  this.addNoteListener('on', (e) => {
    if (!this.isDefaultMode) {
      return;
    }

    const note = parseInt(e.note.number);
    const {isLearning, learningParameter} = mappingsState;

    // learning a new mapping
    if (isLearning && learningParameter) {
      mappingsUi.learn({
        parameter: learningParameter,
        control: note,
        type: 'button',
      });
    }
    // update targets of already mapped parameters
    else {
      const mappedParameters = mappingsState.getParametersByControl(note);
      mappedParameters.forEach((parameter) => {
        playgroundUi.updateParameter(parameter, 1);
      });
    }

    // draw feedback lights
    this.playNote({
      note,
      color: this.settings.colorByState.feedback,
      duration: this.settings.time.defaultDuration,
    });
  });
};

/**
 * Attach controls for the default mode.
 */
controllerDevice.attachControlsDefault = function(): void {
  this.addControlListener((e) => {
    const note = parseInt(e.controller.number);
    const {isLearning, learningParameter} = mappingsState;
    const parameters = mappingsState.getParametersByControl(note);

    parameters.forEach((parameter) => {
      playgroundUi.updateParameter(parameter, e.value);
    });

    if (isLearning && learningParameter) {
      mappingsUi.learn({
        parameter: learningParameter,
        control: note,
        type: 'range',
      });
    }

    this.playNote({
      note: this.settings.outputByInput[note],
      duration: this.settings.time.defaultDuration,
      color: this.settings.colorByState.feedback,
    });
  });
};

/**
 * Attach buttons to a neuron. (select mode)
 */
controllerDevice.attachButtonsToNeuron = function(): void {
  this.addNoteListener('on', (e) => {
    const inputNote = parseInt(e.note.number);
    const index = this.settings.rows.secondButtons.indexOf(inputNote);
    if (index !== -1) {
      this.shifted[index] = true;
      this.playNote({
        note: inputNote,
        color: this.settings.colorByState.shift,
      });
    }
  });

  this.addNoteListener('off', (e) => {
    const inputNote = parseInt(e.note.number);
    const index = this.settings.rows.secondButtons.indexOf(inputNote);
    if (index !== -1) {
      this.shifted[index] = false;
      this.playNote({
        note: inputNote,
        color: this.settings.colorByState.selectMode,
      });
    }
  });
};

/**
 * Attach events to the ranges.
 *
 * @param {number} selectedNode - The selected node.
 */
controllerDevice.attachControlsToNeuron = function(selectedNode: number): void {
  const {neuron} = networkState.getNeuron(selectedNode);
  const links = neuron.inputLinks;

  // first draw
  setTimeout(() => {
    links.forEach((link, index) => {
      link.hasSnapped = false;
      this.playNote({
        note: this.settings.rows.firstButtons[index],
        color: this.settings.colorByState.unsnap,
      });
    });
  }, this.settings.time.wait);

  // listen to changes
  this.addControlListener((e) => {
    const inputNote = e.controller.number;

    // first row: learning rate
    if (this.settings.rows.firstPots.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.firstPots.indexOf(inputNote);
      if (typeof links[index]?.source === 'undefined') {
        return;
      }
      if (links[index].source.isEnabled === false) {
        return;
      }

      const learningRateOptionIndex = parseInt(
        rangeMap(
          e.value,
          0,
          127,
          0,
          selectCardUi.options.learningRate.length - 1,
        ).toString(),
      );

      const learningRate = selectCardUi.options.learningRate[learningRateOptionIndex];

      const hasChanged = networkState.setSourceLearningRate(index, learningRate);
      if (hasChanged) {
        selectCardUi.updateSourceLearningRate(index, learningRate);
        playgroundFacade.updateUI();
      }
    }
    // second row: activation
    else if (this.settings.rows.secondPots.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.secondPots.indexOf(inputNote);
      if (typeof links[index]?.source === 'undefined') {
        return;
      }
      if (links[index].source.isEnabled === false) {
        return;
      }

      const activationOptionIndex = parseInt(
        rangeMap(
          e.value,
          0,
          127,
          0,
          selectCardUi.options.activation.length - 1,
        ).toString(),
      );

      const activation = selectCardUi.options.activation[activationOptionIndex];

      const hasChanged = networkState.setSourceActivation(index, activation);
      if (hasChanged) {
        selectCardUi.updateSourceActivation(index, activation);
        playgroundFacade.updateUI();
      }
    }
    // third row: regularization (shifted) + regularization rate
    else if (this.settings.rows.thirdPots.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.thirdPots.indexOf(inputNote);
      if (typeof links[index]?.source === 'undefined') {
        return;
      }
      if (links[index].source.isEnabled === false) {
        return;
      }

      // regularization (shifted)
      if (this.shifted[index] === true) {
        const regularizationOptionIndex = parseInt(
          rangeMap(
            e.value,
            0,
            127,
            0,
            selectCardUi.options.regularization.length - 1,
          ).toString(),
        );

        const regularization = selectCardUi.options.regularization[regularizationOptionIndex];
        const hasChanged = networkState.setSourceRegularizationType(index, regularization);
        if (hasChanged) {
          selectCardUi.updateSourceRegularizationType(index, regularization);
          playgroundFacade.updateUI();
        }
      }
      // regularization rate
      else {
        const regularizationRateOptionIndex = parseInt(
          rangeMap(
            e.value,
            0,
            127,
            0,
            selectCardUi.options.regularizationRate.length - 1,
          ).toString(),
        );

        const regularizationRate = selectCardUi.options.regularizationRate[regularizationRateOptionIndex];

        const hasChanged = networkState.setSourceRegularizationRate(index, regularizationRate);
        if (hasChanged) {
          selectCardUi.updateSourceRegularizationRate(index, regularizationRate);
          playgroundFacade.updateUI();
        }
      }
    }
    // faders: weights + biases (shifted)
    else if (this.settings.rows.faders.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.faders.indexOf(inputNote);
      if (typeof links[index]?.source === 'undefined') {
        return;
      }
      if (links[index].source.isEnabled === false) {
        return;
      }

      // weights
      if (this.shifted[index] === false) {
        // compute the new value
        // intentionally use 2 decimals to avoid high frequency changes
        const value = parseFloat(
          rangeMap(e.value, 0, 127, -1, 1)
            .toFixed(2),
        );

        if (value.toFixed(1) === links[index].weight.toFixed(1)) {
          // snap
          links[index].hasSnapped = true;

          // automatic unsnap
          if (links[index].snapTimer) {
            clearTimeout(links[index].snapTimer);
          }

          links[index].snapTimer = setTimeout(() => {
            links[index].hasSnapped = false;
            this.playNote({
              note: this.settings.outputByInput[inputNote],
              color: this.settings.colorByState.unsnap,
            });
          }, 800);
        }

        if (links[index].hasSnapped) {
          const hasChanged = networkState.setSourceWeight(index, value);
          if (hasChanged) {
            selectCardUi.updateSourceWeight(index, value);
            playgroundFacade.updateWeightsUI();
          }
          this.playNote({
            note: this.settings.outputByInput[inputNote],
            color: this.settings.colorByState.snap,
          });
        }
        else {
          this.playNote({
            note: this.settings.outputByInput[inputNote],
            color: this.settings.colorByState.unsnap,
          });
        }
      }
      // biases
      else {
        const value = rangeMap(e.value, 0, 127, -1, 1);
        const hasChanged = networkState.setSourceBias(index, value);
        if (hasChanged) {
          selectCardUi.updateSourceBias(index, value);
          playgroundFacade.updateBiasesUI();
        }
      }
    }
  });
};

/**
 * Returns true if the default mode is active.
 */
Object.defineProperty(controllerDevice, 'isDefaultMode', {
  get() {
    return playgroundFacade.selectedNodes.length === 0;
  },
});

/**
 * Returns true if the single (select) mode is active.
 */
Object.defineProperty(controllerDevice, 'isSingleMode', {
  get() {
    return playgroundFacade.selectedNodes.length === 1;
  },
});

/**
 * Returns true if the multiple (select) mode is active.
 */
Object.defineProperty(controllerDevice, 'isMultipleMode', {
  get() {
    return playgroundFacade.selectedNodes.length > 1;
  },
});

/**
 * Set the device to layer mode.
 */
controllerDevice.setLayerMode = function(): void {
  this.initializeLayerMode();
  this.attachButtonsToLayer();
  this.attachControlsToLayer();
};

/**
 * Initialize the layer mode.
 */
controllerDevice.initializeLayerMode = function(): void {
  // all nodes
  this.playNotes({
    firstNote: this.settings.lights.first,
    lastNote: this.settings.lights.last,
    color: this.settings.colorByState.layerMode,
  });

  // color enabled neurons in green
  setTimeout(() => {
    const neurons = networkState.neurons[networkState.selectedLayerIndex];
    neurons.forEach((neuron) => {
      if (neuron.isEnabled === true) {
        const {neuronIndex} = networkState.getNeuronAndLayerIndexes(parseInt(neuron.id));
        this.playNote({
          note: this.settings.rows.firstButtons[neuronIndex - 1],
          color: this.settings.colorByState.selectMode,
        });
        this.playNote({
          note: this.settings.rows.secondButtons[neuronIndex - 1],
          color: this.settings.colorByState.selectMode,
        });
      }
    });
  }, this.settings.time.wait);
};

/**
 * Attach button events to layer mode.
 */
controllerDevice.attachButtonsToLayer = function(): void {
  this.addNoteListener('on', (e) => {
    const inputNote = parseInt(e.note.number);
    const index = this.settings.rows.secondButtons.indexOf(inputNote);
    if (index !== -1) {
      this.shifted[index] = true;
      this.playNote({
        note: inputNote,
        color: this.settings.colorByState.shift,
      });
    }
  });

  this.addNoteListener('off', (e) => {
    const inputNote = parseInt(e.note.number);
    const index = this.settings.rows.secondButtons.indexOf(inputNote);
    if (index !== -1) {
      this.shifted[index] = false;
      this.playNote({
        note: inputNote,
        color: this.settings.colorByState.layerMode,
      });
    }
  });
};

/**
 * Attach control events to layer mode.
 */
controllerDevice.attachControlsToLayer = function(): void {
  const neurons = networkState.neurons[networkState.selectedLayerIndex];

  this.addControlListener((e) => {
    const inputNote = e.controller.number;

    // learning rate
    if (this.settings.rows.firstPots.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.firstPots.indexOf(inputNote);
      if (neurons[index].isEnabled === false) {
        return;
      }

      const learningRateOptionIndex = parseInt(
        rangeMap(
          e.value,
          0,
          127,
          0,
          selectCardUi.options.learningRate.length - 1,
        ).toString(),
      );

      const learningRate = selectCardUi.options.learningRate[learningRateOptionIndex];

      const hasChanged = networkState.setLearningRate(index, learningRate);
      if (hasChanged) {
        layerCardUi.updateLearningRate(index, learningRate);
        playgroundFacade.updateUI();
      }
    }
    // activation
    else if (this.settings.rows.secondPots.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.secondPots.indexOf(inputNote);
      if (neurons[index].isEnabled === false) {
        return;
      }

      const activationOptionIndex = parseInt(
        rangeMap(
          e.value,
          0,
          127,
          0,
          selectCardUi.options.activation.length - 1,
        ).toString(),
      );

      const activation = selectCardUi.options.activation[activationOptionIndex];

      const hasChanged = networkState.setActivation(index, activation);
      if (hasChanged) {
        layerCardUi.updateActivation(index);
        playgroundFacade.updateUI();
      }
    }
    else if (this.settings.rows.thirdPots.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.thirdPots.indexOf(inputNote);
      if (neurons[index].isEnabled === false) {
        return;
      }

      // regularization type (shifted)
      if (this.shifted[index] === true) {
        const regularizationOptionIndex = parseInt(
          rangeMap(
            e.value,
            0,
            127,
            0,
            selectCardUi.options.regularization.length - 1,
          ).toString(),
        );

        const regularization = selectCardUi.options.regularization[regularizationOptionIndex];

        const hasChanged = networkState.setRegularizationType(index, regularization);
        if (hasChanged) {
          layerCardUi.updateRegularizationType(index);
          playgroundFacade.updateUI();
        }
      }
      // regularization rate
      else {
        const regularizationRateOptionIndex = parseInt(
          rangeMap(
            e.value,
            0,
            127,
            0,
            selectCardUi.options.regularizationRate.length - 1,
          ).toString(),
        );

        const regularizationRate = selectCardUi.options.regularizationRate[regularizationRateOptionIndex];

        const hasChanged = networkState.setRegularizationRate(index, regularizationRate);
        if (hasChanged) {
          layerCardUi.updateRegularizationRate(index);
          playgroundFacade.updateUI();
        }
      }
    }
    // bias
    else if (this.settings.rows.faders.indexOf(inputNote) !== -1) {
      const index = this.settings.rows.faders.indexOf(inputNote);
      if (neurons[index].isEnabled === false) {
        return;
      }
      const value = rangeMap(e.value, 0, 127, -1, 1);
      const hasChanged = networkState.setBias(index, value);
      if (hasChanged) {
        layerCardUi.updateBias(index);
        playgroundFacade.updateBiasesUI();
      }
    }
  });
};
