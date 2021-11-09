import * as d3 from 'd3';
import { playgroundFacade } from '../facades/playground.facade';
import { networkState } from '../state/network.state';

export const neuronCardUi = Object.create (null);

neuronCardUi.weightSelector = '.neuron-card__weight';
neuronCardUi.weights = null;
neuronCardUi.cardSelector = '#neuron-card';
neuronCardUi.card = null;

neuronCardUi.init = function () {
  this.fetchWeights ();
  this.fetchCard ();
};

neuronCardUi.fetchCard = function () {
  this.card = d3.select ('#neuron-card');
};

neuronCardUi.fetchWeights = function () {
  this.weights = document.querySelectorAll (this.weightSelector);
};

neuronCardUi.updateCard = function (nodeIndex: number) {
  const { selectedNodes } = playgroundFacade;

  if (selectedNodes.length === 0) {
    this.card.style ('display', 'none');
    return;
  }

  this.card.style ('display', 'flex');

  const nodeTitle = this.card.select ('.node');
  const inputs = this.card.selectAll ('input')[0];

  nodeTitle.text (
    selectedNodes.length === 1
      ? `Node: ${selectedNodes[0]}`
      : `Nodes: ${
        selectedNodes
          .sort ((a, b) => a - b)
          .join (', ')
      }`,
  );

  const { neuron } = networkState.getNeuron (nodeIndex);
  const inputPlaceholder = 'ø or multi.';

  const biasInput = inputs[0] as HTMLInputElement;
  biasInput.placeholder = inputPlaceholder;
  biasInput.value = selectedNodes.length === 1
    ? neuron.bias.toPrecision (2)
    : null;

  const { inputLinks } = neuron;
  inputs.slice (1).forEach ((input: HTMLInputElement, k) => {
    if (typeof inputLinks[k] === 'undefined') {
      input.value = null;
      input.placeholder = inputPlaceholder;
      input.disabled = true;
      return;
    }

    input.disabled = false;

    if (selectedNodes.length > 1) {
      input.value = null;
      input.placeholder = inputPlaceholder;
      return;
    }

    input.value = inputLinks[k].weight.toPrecision (2);
  });
};

neuronCardUi.updateWeight = function (index, weight) {
  this.weights[index].value = weight.toPrecision (2);
};
