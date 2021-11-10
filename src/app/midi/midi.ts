import * as WebMidi from 'webmidi';
import { Input, Output } from 'webmidi';
import { getKnownDeviceInfo } from '../devices/utils/get-known-device-info';
import { Device, Devices } from '../devices/device/device.types';
import { devicesState } from '../state/devices.state';
import { devicesUi } from '../ui/devices.ui';

export const midi = Object.create (null);

midi.isInitialized = false as boolean;
midi.service = WebMidi as typeof WebMidi;
midi.sysexEnabled = true as boolean;
midi.ports = null as Devices;
midi.inputs = null as Input[];
midi.outputs = null as Output[];

/**
 * Initialize MIDI
 */
midi.init = async function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('midi is already initialized');
  }
  await this.enableService ();
  this.isInitialized = true;
};

/**
 * Enable MIDI service
 *
 * @returns {Promise<void>}
 */
midi.enableService = function (): Promise<void> {
  return new Promise ((resolve) => {
    this.service.enable ((error) => {
      if (error) {
        throw new Error ('WebMidi could not be loaded' + error);
      }

      this.inputs = this.service.inputs;
      this.outputs = this.service.outputs;

      this.service.addListener ('connected', () => this.handleConnectedEvent ());
      this.service.addListener ('disconnected', () => this.handleDisconnectedEvent ());

      resolve (null);
    }, this.sysexEnabled);
  });
};

/**
 * Handle connected MIDI device
 */
midi.handleConnectedEvent = function (): void {
  this.inputs.forEach ((input) => this.handleConnectedPort (input));
  this.outputs.forEach ((output) => this.handleConnectedPort (output));
  this.setPorts ();
  devicesState.init (this.ports);
  devicesUi.render ();
};

/**
 * Handle disconnected MIDI device
 */
midi.handleDisconnectedEvent = function (): void {
  this.inputs.forEach ((input) => this.handleDisconnectedPort (input));
  this.outputs.forEach ((output) => this.handleDisconnectedPort (output));
  this.setPorts ();
  devicesState.init (this.ports);
  devicesUi.render ();
};

/**
 * Utility function to handle input and output connections
 *
 * @param {*} port - The MIDI input or output
 */
midi.handleConnectedPort = function (port): void {
  const { manufacturer, name } = port;
  const {
    isKnown,
    isController,
    isSelector,
    settings,
  } = getKnownDeviceInfo (manufacturer, name);

  port.isPicked = false;

  if (isKnown) {
    port.isKnown = true;
    port.isController = port.isController || isController;
    port.isSelector = port.isSelector || isSelector;
    port.settings = port.settings || settings;
  } else {
    port.isKnown = false;
  }
};

/**
 * Utility function to handle input and output disconnections
 *
 * @param {*} port - The MIDI input or output
 */
midi.handleDisconnectedPort = function (port) {
  // clunky, port.connection is an async getter
  setTimeout (() => {
    if (port.isPicked && port.connection !== 'open') {
      devicesState.unpickDevice (port);
    }
  }, 100);
};

/**
 * Set known devices
 */
midi.setPorts = function () {
  const knownInputs = this.inputs.filter ((input) => input.isKnown);
  const knownInputsByName = this.sortPortsByName (knownInputs);

  const knownOutputs = this.outputs.filter ((output) => output.isKnown);
  const knownOutputsByName = this.sortPortsByName (knownOutputs);

  this.ports = Object.keys (knownInputsByName).reduce ((acc, name) => {
    const knownInput = knownInputsByName[name]?.[0] || null;
    const knownOutput = knownOutputsByName[name]?.[0] || null;
    const isController = knownInput.isController || false;
    const isSelector = knownInput.isSelector || false;

    // input or output can be null while connecting/disconnecting
    if (!knownInput || !knownOutput) {
      return acc;
    }

    acc[name] = {
      isController,
      isSelector,
      input: knownInput,
      output: knownOutput,
    } as Device;

    return acc;
  }, {});
};

/**
 * Utility function to sort MIDI ports by name
 *
 * @param {*} ports - The MIDI inputs or outputs
 * @returns {*} Map of ports by name
 */
midi.sortPortsByName = function (ports): any {
  return ports.reduce ((acc, inputOrOutput) => {
    const name = inputOrOutput.name;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push (inputOrOutput);
    return acc;
  }, {});
};
