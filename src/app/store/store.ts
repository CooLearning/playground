import { devicesState } from '../state/devices.state';
import { mappingsState } from '../state/mappings.state';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require ('../../../package.json');

export const store = Object.create (null);

store.state = {
  version: packageJson.version,
};

store.load = function () {
  if (this.state.devices.selector) {
    devicesState.pickSelector (this.state.devices.selector);
  }
  if (this.state.devices.controller) {
    devicesState.pickController (this.state.devices.controller);
  }
  if (this.state.mappings.controlByParameter) {
    mappingsState.controlByParameter = {
      ...this.state.mappings.controlByParameter,
    };
  }
  if (this.state.mappings.parametersByControl) {
    mappingsState.parametersByControl = {
      ...this.state.mappings.parametersByControl,
    };
  }
};

store.save = function () {
  // build transitive state object
  const state = { ...this.state };

  // devices
  state.devices = {
    selector: devicesState?.pickedSelector?.name || null,
    controller: devicesState?.pickedController?.name || null,
  };

  // mappings
  state.mappings = {
    controlByParameter: mappingsState?.controlByParameter || null,
    parametersByControl: mappingsState?.parametersByControl || null,
  };

  // save
  this.localStorage = JSON.stringify (state);
};

store.identifier = 'coolearning';
Object.defineProperty (store, 'localStorage', {
  get (): string {
    return window.localStorage[this.identifier];
  },
  set (string: string) {
    window.localStorage[this.identifier] = string;
  },
});

store.init = function () {
  try {
    const stateFromStorage = JSON.parse (this.localStorage);
    if (this.state.version === stateFromStorage.version) {
      // version matches, can load
      this.state = stateFromStorage;
      this.load ();
    }
    else {
      // no match, reset
      this.reset ();
    }
  }
  catch (error) {
    // reset
    this.reset ();
  }
};

store.delete = function () {
  window.localStorage.removeItem (this.identifier);
};

store.reset = function () {
  this.delete ();
  this.reloadWindow ();
};

store.reloadWindow = function () {
  window.location.reload ();
};
