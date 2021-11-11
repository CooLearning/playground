import { midi } from './midi/midi';
import { ui } from './ui/ui';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require ('../../package.json');

export const app = Object.create (null);

app.isInitialized = false;
app.version = packageJson.version;

/**
 * Initialize app
 */
app.init = async function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('app is already initialized');
  }

  await ui.init ();
  await midi.init ();

  this.isInitialized = true;

  // eslint-disable-next-line no-console
  console.log (app);
};
