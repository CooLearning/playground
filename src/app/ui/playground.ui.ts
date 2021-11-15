import { isTabActive } from '../utils/is-tab-active';
import { rangeMap } from '../utils/range-map';
import { mappingsUi } from './mappings.ui';
import { networkState } from '../state/network.state';
import { layerCardUi } from './layer-card.ui';

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

// -----------------------------------------------------------------------------

playgroundUi.nodeSelectors = {
  layer: '.plus-minus-neurons', // origin playground name
};

playgroundUi.init = function () {
  this.fetchLayers ();
  this.attachLayers ();
  this.renderLayers ();
};

playgroundUi.fetchLayers = function () {
  this.layers = Array.from (document.querySelectorAll (this.nodeSelectors.layer));
};

playgroundUi.renderLayers = function () {
  this.layers.forEach ((layer, index) => {
    layer.style.outline = '1px solid black';
    layer.style.cursor = 'pointer';
    layer.style.userSelect = 'none';
    layer.style.height = '28px';
    layer.children[0].style.height = '100%';
    if (index === networkState.selectedLayerIndex) {
      layer.style.backgroundColor = 'yellow';
    }
    else {
      layer.style.backgroundColor = null;
    }
  });
};

playgroundUi.attachLayers = function () {
  this.layers.forEach ((layer, index) => {
    layer.onclick = () => {
      if (index === networkState.selectedLayerIndex) {
        // repeat => toggle
        networkState.selectedLayerIndex = null;
      }
      else {
        // set
        networkState.selectedLayerIndex = index;
      }

      this.renderLayers ();
      layerCardUi.updateCard ();
    };
  });
};
