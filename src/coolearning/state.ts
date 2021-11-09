import { renderSetting } from './utils/render-setting';
import { notificationsUi } from '../app/ui/notifications.ui';

const initialState = {
  isLearning: false,
  learningParameter: null,
  devices: [],
  controlByParameter: {},
  parametersByControl: {},
};

export const state = (function () {
  const localStorageIdentifier = 'coolearning';
  let isLearning = initialState.isLearning;
  let learningParameter = initialState.learningParameter;
  let devices = initialState.devices;
  let controlByParameter = initialState.controlByParameter;
  let parametersByControl = initialState.parametersByControl;

  function loadState () {
    try {
      const string = window.localStorage[localStorageIdentifier];
      const json = JSON.parse (string);
      isLearning = json.isLearning;
      learningParameter = json.learningParameter;
      devices = json.ports;
      controlByParameter = json.controlByParameter;
      parametersByControl = json.parametersByControl;
    } catch (error) {
      throw new Error ('error while importing state');
    }
  }

  if (window.localStorage[localStorageIdentifier]) {
    loadState ();
  }

  function reset () {
    isLearning = initialState.isLearning;
    learningParameter = initialState.learningParameter;
    devices = initialState.devices;
    controlByParameter = initialState.controlByParameter;
    parametersByControl = initialState.parametersByControl;

    window.localStorage.removeItem (localStorageIdentifier);
    window.location.reload ();
  }

  function saveState () {
    const string = JSON.stringify ({
      isLearning,
      learningParameter,
      devices,
      controlByParameter,
      parametersByControl,
    });
    window.localStorage.setItem (localStorageIdentifier, string);
  }

  function enableLearningMode (newLearningParameter) {
    isLearning = true;
    learningParameter = newLearningParameter;
  }

  function disableLearningMode () {
    isLearning = false;
    learningParameter = null;
  }

  function learn (options: {
    parameter: string;
    control: number;
    type: string;
  }) {
    const { parameter, control, type } = options;

    if (controlByParameter[parameter]) {
      return;
    }

    controlByParameter[parameter] = {
      control,
      type,
    };

    if (Array.isArray (parametersByControl[control])) {
      parametersByControl[control] = [
        ...parametersByControl[control],
        parameter,
      ];
    } else {
      parametersByControl[control] = [
        parameter,
      ];
    }

    disableLearningMode ();

    renderSetting ({
      parameter,
      control,
      type,
    });

    notificationsUi.notify (
      `Learn: control ${control} for ${parameter} (${type})`,
    );

    saveState ();
  }

  function unlearn (parameter) {
    if (!controlByParameter[parameter]) {
      return;
    }

    const { control } = controlByParameter[parameter];

    delete controlByParameter[parameter];

    if (parametersByControl[control].length === 1) {
      delete parametersByControl[control];
    } else {
      parametersByControl[control] = parametersByControl[control].filter ((p) => p !== parameter);
    }

    renderSetting ({ parameter });

    notificationsUi.notify (`Unlearn: control ${control} for ${parameter}`);

    saveState ();
  }

  function getParametersByControl (control) {
    if (!parametersByControl[control]) {
      return;
    }
    return parametersByControl[control];
  }

  function getControlByParameter (parameter) {
    if (!controlByParameter[parameter]) {
      return;
    }
    return controlByParameter[parameter];
  }

  function render (parameter) {
    if (!controlByParameter[parameter]) {
      renderSetting ({
        parameter,
      });
    } else {
      const { control, type } = getControlByParameter (parameter);
      renderSetting ({
        parameter,
        control,
        type,
      });
    }
  }

  function addDevice (device) {
    devices = [
      ...devices,
      device,
    ];

    notificationsUi.notify (
      `device ${device.id} added`,
      500,
    );
  }

  function removeDevice (device) {
    devices = devices.filter ((d) => d.id !== device.id);

    notificationsUi.notify (
      `device ${device.id} removed`,
      500,
    );
  }

  return {
    get isLearning () {
      return isLearning;
    },
    get learningParameter () {
      return learningParameter;
    },
    get devices () {
      return devices;
    },
    reset,
    enableLearningMode,
    learn,
    unlearn,
    getParametersByControl,
    render,
    addDevice,
    removeDevice,
  };
}) ();
