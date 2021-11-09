import { mappingState } from './mapping.state';

/**
 * Object to store the state of the application.
 * Powered by localStorage.
 */
export const storageState = Object.create (null);

storageState.localStorageIdentifier = 'coolearning';

Object.defineProperty (storageState, 'localStorage', {
  get (): string {
    return window.localStorage[this.localStorageIdentifier];
  },
  set (string: string) {
    window.localStorage[this.localStorageIdentifier] = string;
  },
});

/**
 * Initializes the state object.
 *
 * @param {boolean} [forceReset=false] - Forces the state to be reset.
 */
storageState.init = function (forceReset = false) {
  if (forceReset) {
    this.resetState ();
  } else if (this.isLocalStorageDefined ()) {
    this.parseLocalStorage ();
  } else {
    this.initializeState ();
  }
};

/**
 * Initializes the state.
 */
storageState.initializeState = function () {
  //
};

/**
 * Resets the state.
 */
storageState.resetState = function () {
  this.initializeState ();
  this.reloadWindow ();
};

/**
 * Loads the state from local storage.
 *
 * @returns {boolean} - Whether the browser supports local storage.
 */
storageState.isLocalStorageDefined = function (): boolean {
  return typeof window.localStorage[this.localStorageIdentifier] !== 'undefined';
};

/**
 * Parse the state from local storage.
 *
 * @returns {*} - The parsed state from local storage.
 */
storageState.parseLocalStorage = function () {
  let json = null;
  try {
    json = JSON.parse (this.localStorage);
  } catch (error) {
    throw new Error ('local storage could not be parsed');
  }
  return json;
};

/**
 * Reloads the window.
 */
storageState.reloadWindow = function () {
  window.localStorage.removeItem (this.localStorageIdentifier);
  window.location.reload ();
};

storageState.fetchStates = function () {
  return {
    mapping: mappingState.state,
  };
};

storageState.stringifyState = function () {
  return JSON.stringify (this.fetchStates ());
};

storageState.saveToLocalStorage = function () {
  this.localStorage = this.stringifyState ();
};
