import { midi } from './midi/midi';
import { ui } from './ui/ui';

export const app = Object.create (null);

app.isInitialized = false;

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
