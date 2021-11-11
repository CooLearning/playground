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
  } else if (this.isSingleMode) {
    color = this.settings.colors.black;
  } else {
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
  } else if (this.isSingleMode) {
    this.setSingleMode ();
  } else {
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
  const selectedNode = playgroundFacade.selectedNodes[0];
  this.attachControlsToNeuron (selectedNode);
};

/**
 * Set the multiple mode.
 */
controllerDevice.setMultipleMode = function () {
  const { selectedNodes } = playgroundFacade;
  selectedNodes.forEach ((n) => this.attachControlsToNeuron (n));
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

/**
 * Attach events to the ranges.
 *
 * @param {number} selectedNode - The selected node.
 */
controllerDevice.attachControlsToNeuron = function (selectedNode: number): void {
  const { neuron } = networkState.getNeuron (selectedNode);
  const links = neuron.inputLinks;

  const filteredLinks = links.map ((link) => ({
    weight: link.weight,
    hasSnapped: false,
  }));

  // first draw
  filteredLinks.forEach ((weight, index) => {
    const note = this.settings.rows.firstButtons[index];
    this.playNote ({
      note,
      color: this.settings.colors.red,
    });
  });

  // listen to changes
  this.addControlListener ((e) => {
    if (
      e.controller.number >= this.settings.rows.faders[0]
      && e.controller.number <= this.settings.rows.faders[7]
    ) {
      const index = e.controller.number - this.settings.rows.faders[0];
      const source = links[index].source;
      if (typeof source === 'undefined') {
        return;
      }
      const value = rangeMap (e.value, 0, 127, -1, 1);

      if (value.toFixed (1) === filteredLinks[index].weight.toFixed (1)) {
        filteredLinks[index].hasSnapped = true;
      }

      if (filteredLinks[index].hasSnapped && source.isEnabled) {
        links[index].weight = value;
        neuronCardUi.updateWeight (index, value);
        this.playNote ({
          note: this.settings.outputByInput[e.controller.number],
          color: this.settings.colors.green,
        });
      } else {
        this.playNote ({
          note: this.settings.outputByInput[e.controller.number],
          color: this.settings.colors.red,
        });
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
