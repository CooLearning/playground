import { isTabActive } from '../../coolearning/utils/is-tab-active';
import { rangeMap } from '../utils/range-map';

/**
 * View model for the parameters UI.
 * Parameters are the interface settings like `learning rate` and `activation function`.
 */
export const parametersUi = Object.create (null);

parametersUi.nodes = {
  playPauseButton: document.getElementById ('play-pause-button'),
  resetButton: document.getElementById ('reset-button'),
  learningRate: document.getElementById ('learningRate'),
  activation: document.getElementById ('activations'),
  regularizations: document.getElementById ('regularizations'),
  regularizationRate: document.getElementById ('regularRate'),
  problemType: document.getElementById ('problem'),
  addLayers: document.getElementById ('add-layers'),
  removeLayers: document.getElementById ('remove-layers'),
  ratioOfTrainingToTest: document.getElementById ('percTrainData'),
  noise: document.getElementById ('noise'),
  batchSize: document.getElementById ('batchSize'),
  showTestData: document.getElementById ('show-test-data').parentNode,
  discretize: document.getElementById ('discretize').parentNode,
};

/**
 * Render the parameters UI.
 *
 * @param {string} name - The name of the parameter to render.
 * @param {number} value - The value of the parameter to render.
 */
parametersUi.render = function (name: string, value: number): void {
  if (typeof name === 'undefined') {
    throw new Error ('parameter is not defined');
  }
  if (typeof value === 'undefined') {
    throw new Error ('value is not defined');
  }
  if (!isTabActive ()) {
    return;
  }

  const parameter = this.nodes[name];
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
