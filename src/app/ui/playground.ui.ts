import { isTabActive } from '../utils/is-tab-active';
import { rangeMap } from '../utils/range-map';
import { mappingsUi } from './mappings.ui';
import { playgroundFacade } from '../facades/playground.facade';
import { selectorDevice } from '../devices/selector.device';

export const playgroundUi = Object.create (null);

/**
 * Update the given parameter.
 *
 * @param {string} name - The name of the parameter to update.
 * @param {number} value - The value of the parameter to update.
 */
playgroundUi.updateParameter = function (name: string, value: number): void {
  if (typeof name === 'undefined') {
    throw new Error ('parameter is not defined');
  }
  if (typeof value === 'undefined') {
    throw new Error ('value is not defined');
  }
  if (!isTabActive ()) {
    return;
  }

  const parameter = mappingsUi.parameterQueries[name];
  if (!parameter) {
    throw new Error ('parameter name was not found in listed nodes');
  }

  // render the parameter depending on its HTML nature.
  switch (parameter.tagName) {
    case 'SELECT': {
      const length = parameter.children.length - 1;
      const scaledValue = rangeMap (value, 0, 127, 0, length);
      const scaledInteger = parseInt (scaledValue.toString ());
      const areDifferent = scaledInteger !== parameter.selectedIndex;

      if (areDifferent) {
        parameter.selectedIndex = scaledInteger;
        parameter.dispatchEvent (new Event ('change'));
      }

      break;
    }

    case 'BUTTON': {
      parameter.click ();
      break;
    }

    case 'INPUT': {
      const min = parseInt (parameter.min);
      const max = parseInt (parameter.max);
      const step = parseInt (parameter.step);

      const v = rangeMap (value, 0, 127, min, max);
      const n = parseInt (v.toString ());
      const isStep = (n % step) === 0;
      const areDifferent = n !== parseInt (parameter.value);

      if (isStep && areDifferent) {
        parameter.value = n.toString ();
        parameter.dispatchEvent (new Event ('input'));
      }

      break;
    }

    case 'LABEL': {
      if (value === 0) {
        return;
      }
      parameter.click ();
      break;
    }

    default:
      throw new Error (`${parameter.tagName} target not handled`);
  }
};

playgroundUi.togglePlayback = function () {
  playgroundFacade.togglePlayback ();
  selectorDevice.updateLightPlayback ();
};
