import { devicePrototype } from './device/device.prototype';
import { rangeMap } from '../utils/range-map';
import { playgroundFacade } from '../facades/playground.facade';
import { neuronCardUi } from '../ui/neuron-card.ui';
import { networkState } from '../state/network.state';
import { mappingsState } from '../state/mappings.state';
import { mappingsUi } from '../ui/mappings.ui';
import { playgroundUi } from '../ui/playground.ui';

/**
 * Controller is a unique device that controls the playground.
 * It has 3 layout modes:
 *   - Default `0`
 *   - Single selection `1`
 *   - Multiple selection `2`
 */
export const controllerDevice = Object.create (devicePrototype);

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
controllerDevice.init = async function (device: any): Promise<void> {
  if (this.isInitialized) {
    this.removeListeners ();
  }

  this.isInitialized = false;

  this.device = device;
  this.settings = device.settings;

  await this.runBootSequence ();
  this.drawLights ();
  this.updateMode ();

  this.isInitialized = true;
};

/**
 * Draw all lights.
 */
controllerDevice.drawLights = function () {
  if (!this.isInitialized) {
    return;
  }

  let color;
  if (this.isDefaultMode) {
    color = this.settings.colors.amber;
  }
  else if (this.isSingleMode) {
    color = this.settings.colors.black;
  }
  else {
    color = this.settings.colors.red;
  }

  this.playNotes ({
    firstNote: this.settings.lights.first,
    lastNote: this.settings.lights.last,
    color,
  });
};

/**
 * Set the mode of the controller.
 */
controllerDevice.updateMode = function () {
  this.removeListeners ();

  if (this.isDefaultMode) {
    this.setDefaultMode ();
  }
  else if (this.isSingleMode) {
    this.setSingleMode ();
  }
  else {
    this.setMultipleMode ();
  }
};

/**
 * Set the default mode.
 */
controllerDevice.setDefaultMode = function () {
  this.attachButtonsDefault ();
  this.attachControlsDefault ();
};

/**
 * Set the single mode.
 */
controllerDevice.setSingleMode = function () {
  const node = playgroundFacade.selectedNodes[0];
  this.attachButtonsToNeuron ();
  this.attachControlsToNeuron (node);
};

/**
 * Set the multiple mode.
 */
controllerDevice.setMultipleMode = function () {
  const { selectedNodes } = playgroundFacade;
  selectedNodes.forEach ((node) => {
    this.attachButtonsToNeuron ();
    this.attachControlsToNeuron (node);
  });
};

/**
 * This is called when selection is made.
 */
controllerDevice.onSelectionEvent = function () {
  if (!this.isInitialized) {
    return;
  }

  this.drawLights ();
  setTimeout (() => {
    this.updateMode ();
  }, this.settings.time.wait);
};

/**
 * Attach buttons for the default mode.
 */
controllerDevice.attachButtonsDefault = function () {
  this.addNoteListener ('on', (e) => {
    if (!this.isDefaultMode) {
      return;
    }

    const note = parseInt (e.note.number);

    // learning a new mapping
    const { isLearning, learningParameter } = mappingsState;
    if (isLearning && learningParameter) {
      mappingsUi.learn ({
        parameter: learningParameter,
        control: note,
        type: 'button',
      });
    }

    // update targets of already mapped parameters
    const mappedParameters = mappingsState.getParametersByControl (note);
    mappedParameters.forEach ((parameter) => {
      playgroundUi.updateParameter (parameter, 1);
    });

    // draw feedback lights
    this.playNote ({
      note,
      color: this.settings.colors.green,
      duration: this.settings.time.defaultDuration,
    });
  });
};

/**
 * Attach controls for the default mode.
 */
controllerDevice.attachControlsDefault = function () {
  this.addControlListener ((e) => {
    const note = parseInt (e.controller.number);
    const { isLearning, learningParameter } = mappingsState;
    const parameters = mappingsState.getParametersByControl (note);

    parameters.forEach ((parameter) => {
      playgroundUi.updateParameter (parameter, e.value);
    });

    if (isLearning && learningParameter) {
      mappingsUi.learn ({
        parameter: learningParameter,
        control: note,
        type: 'range',
      });
    }

    this.playNote ({
      note: this.settings.outputByInput[note],
      duration: this.settings.time.defaultDuration,
      color: this.settings.colors.red,
    });
  });
};

controllerDevice.attachButtonsToNeuron = function (): void {
  this.addNoteListener ('on', (e) => {
    const inputNote = parseInt (e.note.number);
    const index = this.settings.rows.secondButtons.indexOf (inputNote);
    if (index !== -1) {
      this.shifted[index] = true;
      this.playNote ({
        note: inputNote,
        color: this.settings.colors.amber,
      });
    }
  });

  this.addNoteListener ('off', (e) => {
    const inputNote = parseInt (e.note.number);
    const index = this.settings.rows.secondButtons.indexOf (inputNote);
    if (index !== -1) {
      this.shifted[index] = false;
      this.playNote ({
        note: inputNote,
        color: this.settings.colors.black,
      });
    }
  });
};

/**
 * Attach events to the ranges.
 *
 * @param {number} selectedNode - The selected node.
 */
controllerDevice.attachControlsToNeuron = function (selectedNode: number): void {
  const { neuron } = networkState.getNeuron (selectedNode);
  const links = neuron.inputLinks;

  // first draw
  links.forEach ((link, index) => {
    link.hasSnapped = false;
    this.playNote ({
      note: this.settings.rows.firstButtons[index],
      color: this.settings.colors.red,
    });
  });

  // listen to changes
  this.addControlListener ((e) => {
    const inputNote = e.controller.number;

    // first row: learning rate
    if (this.settings.rows.firstPots.indexOf (inputNote) !== -1) {
      const index = inputNote - this.settings.rows.firstPots[0];
      const learningRateOptionIndex = parseInt (
        rangeMap (
          e.value,
          0,
          127,
          0,
          neuronCardUi.options.learningRate.length - 1,
        ).toString (),
      );

      const learningRate = neuronCardUi.options.learningRate[learningRateOptionIndex];

      if (learningRate !== neuron.inputLinks[index].source.learningRate) {
        networkState.updateSourceLearningRate (index, learningRate);
        neuronCardUi.setLearningRate (index, learningRate);
        playgroundFacade.updateUI ();
      }
    }
    // second row: activation
    else if (this.settings.rows.secondPots.indexOf (inputNote) !== -1) {
      const index = inputNote - this.settings.rows.secondPots[0];
      const activationOptionIndex = parseInt (
        rangeMap (
          e.value,
          0,
          127,
          0,
          neuronCardUi.options.activation.length - 1,
        ).toString (),
      );

      const activation = neuronCardUi.options.activation[activationOptionIndex];

      if (activation !== neuron.inputLinks[index].source.activation.name) {
        networkState.updateSourceActivation (index, activation);
        neuronCardUi.setActivation (index, activation);
        playgroundFacade.updateUI ();
      }
    }
    // third row: regularization + regularization rates (shifted)
    else if (this.settings.rows.thirdPots.indexOf (inputNote) !== -1) {
      const index = this.settings.rows.thirdPots.indexOf (inputNote);
      // regularization
      if (this.shifted[index] === false) {
        const regularizationOptionIndex = parseInt (
          rangeMap (
            e.value,
            0,
            127,
            0,
            neuronCardUi.options.regularization.length - 1,
          ).toString (),
        );

        const regularization = neuronCardUi.options.regularization[regularizationOptionIndex];

        if (regularization !== neuron.inputLinks[index].source.regularization.name) {
          networkState.updateSourceRegularization (index, regularization);
          neuronCardUi.setRegularization (index, regularization);
          playgroundFacade.updateUI ();
        }
      }
      // regularization rate
      else {
        const regularizationRateOptionIndex = parseInt (
          rangeMap (
            e.value,
            0,
            127,
            0,
            neuronCardUi.options.regularizationRate.length - 1,
          ).toString (),
        );

        const regularizationRate = neuronCardUi.options.regularizationRate[regularizationRateOptionIndex];

        if (regularizationRate !== neuron.inputLinks[index].source.regularizationRate) {
          networkState.updateSourceRegularizationRate (index, regularizationRate);
          neuronCardUi.setRegularizationRate (index, regularizationRate);
          playgroundFacade.updateUI ();
        }
      }
    }
    // faders: weights + biases (shifted)
    else if (this.settings.rows.faders.indexOf (inputNote) !== -1) {
      const index = this.settings.rows.faders.indexOf (inputNote);
      const source = links?.[index]?.source;
      if (typeof source === 'undefined') {
        return;
      }

      // weights
      if (this.shifted[index] === false) {
        // compute the new value
        // intentionally use 2 decimals to avoid high frequency changes
        const value = parseFloat (
          rangeMap (e.value, 0, 127, -1, 1)
            .toFixed (2),
        );

        if (value.toFixed (1) === links[index].weight.toFixed (1)) {
          // snap
          links[index].hasSnapped = true;

          // automatic unsnap
          if (links[index].snapTimer) {
            clearTimeout (links[index].snapTimer);
          }

          links[index].snapTimer = setTimeout (() => {
            links[index].hasSnapped = false;
            this.playNote ({
              note: this.settings.outputByInput[inputNote],
              color: this.settings.colors.red,
            });
          }, 800);
        }

        if (links[index].hasSnapped && source.isEnabled) {
          networkState.setWeight (index, value);
          neuronCardUi.setWeight (index, value);
          playgroundFacade.updateWeightsUI ();
          this.playNote ({
            note: this.settings.outputByInput[inputNote],
            color: this.settings.colors.green,
          });
        }
        else {
          this.playNote ({
            note: this.settings.outputByInput[inputNote],
            color: this.settings.colors.red,
          });
        }
      }
      // biases
      else {
        const value = rangeMap (e.value, 0, 127, -1, 1);
        if (value.toFixed (2) !== neuron.inputLinks[index].source.bias.toFixed (2)) {
          neuron.inputLinks[index].source.bias = value;
          neuronCardUi.setBias (index, value);
          playgroundFacade.updateBiasesUI ();
        }
      }
    }
  });
};

Object.defineProperty (controllerDevice, 'isDefaultMode', {
  get () {
    return playgroundFacade.selectedNodes.length === 0;
  },
});

Object.defineProperty (controllerDevice, 'isSingleMode', {
  get () {
    return playgroundFacade.selectedNodes.length === 1;
  },
});

Object.defineProperty (controllerDevice, 'isMultipleMode', {
  get () {
    return playgroundFacade.selectedNodes.length > 1;
  },
});
