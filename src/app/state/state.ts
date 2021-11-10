import { mappingState } from './mapping.state';
import { storageState } from './storage.state';

/**
 * Global state object for the application.
 */
export const state = Object.create (null);

state.mappings = mappingState;
state.store = storageState;

state.reset = function () {
  // todo implement after save, load, export, import
  // eslint-disable-next-line no-console
  console.log ('reset');
};
