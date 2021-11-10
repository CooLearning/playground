import { midi } from './devices/midi';
import { devices } from './devices/devices';
import { selectorDevice } from './devices/selector.device';
import { controllerDevice } from './devices/controller.device';
import { ui } from './ui/ui';

export const app = Object.create (null);

app.isInitialized = false;

/**
 * Initialize app
 */
app.init = async function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('main is already initialized');
  }

  await ui.init ();
  await midi.init ();
  await this.attachDevices ();

  this.isInitialized = true;

  // eslint-disable-next-line no-console
  console.log (app);
};

/**
 * Attach devices
 */
app.attachDevices = async function () {
  devices.init (midi.ports);
  await Promise.all ([
    selectorDevice.init (devices.pickSelector (1)),
    controllerDevice.init (devices.pickController (0)),
  ]);
};

/**
 * Reset devices
 */
app.resetDevices = async function () {
  devices.isInitialized = false;
  selectorDevice.isInitialized = false;
  controllerDevice.isInitialized = false;
  await this.attachDevices ();
};
