import * as WebMidi from 'webmidi';
import { Input, Output } from 'webmidi';
import { getKnownDeviceInfo } from './utils/get-known-device-info';
import { Device, Devices } from './device/device.types';

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

      this.service.addListener ('connected', () => this.handleConnected ());
      this.service.addListener ('disconnected', () => this.handleDisconnected ());

      resolve (null);
    }, this.sysexEnabled);
  });
};

/**
 * Handle connected MIDI device
 */
midi.handleConnected = function (): void {
  this.inputs.forEach ((input) => this.onConnect (input));
  this.outputs.forEach ((output) => this.onConnect (output));
  this.setPorts ();
};

/**
 * Utility function to handle input and output connections
 *
 * @param {*} port - The MIDI input or output
 */
midi.onConnect = function (port): void {
  const { manufacturer, name } = port;
  const {
    isKnown,
    isController,
    isSelector,
    settings,
  } = getKnownDeviceInfo (manufacturer, name);

  port.isConnected = port.isConnected || true;
  port.isUsed = port.isUsed || false;

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
 * Handle disconnected MIDI device
 */
midi.handleDisconnected = function (): void {
  // this.inputs.forEach (this.onDisconnect);
  // this.outputs.forEach (this.onDisconnect);
};

/**
 * Utility function to handle input and output disconnections
 *
 * @param {*} port - The MIDI input or output
 */
midi.onDisconnect = function (port) {
  if (port.isUsed) {
    // eslint-disable-next-line no-console
    console.log (`${port.name} in used has been disconnected`);
  }
  port.isConnected = false;
};

/**
 * Set known devices
 */
midi.setPorts = function () {
  const knownInputs = this.inputs.filter ((input) => input.isKnown && input.isConnected);
  const knownInputsByName = this.sortPortsByName (knownInputs);

  const knownOutputs = this.outputs.filter ((output) => output.isKnown && output.isConnected);
  const knownOutputsByName = this.sortPortsByName (knownOutputs);

  this.ports = Object.keys (knownInputsByName).reduce ((acc, name) => {
    const knownInput = knownInputsByName[name]?.[0] || null;
    const knownOutput = knownOutputsByName[name]?.[0] || null;
    const isController = knownInput.isController || false;
    const isSelector = knownInput.isSelector || false;

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
