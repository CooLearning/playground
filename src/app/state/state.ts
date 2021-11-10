import { mappingsState } from './mappings.state';
import { storageState } from './storage.state';

/**
 * Global state object for the application.
 */
export const state = Object.create (null);

state.mappings = mappingsState;
state.store = storageState;

state.reset = function () {
  // todo implement after save, load, export, import
  // eslint-disable-next-line no-console
  console.log ('reset');
};
