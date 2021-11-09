import { mappingState } from './mapping.state';
import { storageState } from './storage.state';

/**
 * Global state object for the application.
 */
export const state = Object.create (null);

state.mappings = mappingState;
state.store = storageState;
