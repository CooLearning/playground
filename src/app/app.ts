import { ui } from './ui/ui';
import { midi } from './midi/midi';
import { store } from './store/store';

export const app = Object.create (null);

app.isInitialized = false;

/**
 * Initialize app
 */
app.init = async function (): Promise<void> {
  if (this.isInitialized) {
    throw new Error ('app is already initialized');
  }

  await midi.init ();
  store.init ();
  await ui.init ();

  this.isInitialized = true;

  // eslint-disable-next-line no-console
  console.log ({ version: store.state.version });
};
