import * as d3 from 'd3';
import { playgroundFacade } from '../facades/playground.facade';
import { networkState } from '../state/network.state';

export const selectCardUi = Object.create (null);

selectCardUi.nodeSelectors = {
  node: '#select-card',
  row: 'div.row:not(.header)',
  weight: 'input.weight',
  bias: 'input.bias',
  learningRate: 'div.learning-rate',
  activation: 'div.activation',
  regularization: 'div.regularization',
  regularizationRate: 'div.regularization-rate',
};

selectCardUi.placeholders = {
  undefined: 'ø',
  multi: 'multi.',
  disabled: 'disabled',
};

selectCardUi.options = {
  learningRate: [0.00001, 0.0001, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
  activation: ['relu', 'tanh', 'sigmoid', 'linear'],
  regularization: ['none', 'L1', 'L2'],
  regularizationRate: [0, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
};

selectCardUi.init = function () {
  this.fetchCard ();
  this.createLearningRates ();
  this.createActivations ();
  this.createRegularizations ();
  this.createRegularizationRates ();
  this.attachEvents ();
};

selectCardUi.fetchCard = function () {
  this.node = d3.select (this.nodeSelectors.node);
  this.rows = this.node.selectAll (this.nodeSelectors.row)[0];
  this.weights = this.node.selectAll (this.nodeSelectors.weight)[0];
  this.biases = this.node.selectAll (this.nodeSelectors.bias)[0];
  this.learningRates = this.node.selectAll (this.nodeSelectors.learningRate)[0];
  this.activations = this.node.selectAll (this.nodeSelectors.activation)[0];
  this.regularizations = this.node.selectAll (this.nodeSelectors.regularization)[0];
  this.regularizationRates = this.node.selectAll (this.nodeSelectors.regularizationRate)[0];
};

selectCardUi.createOptions = function (parent, options) {
  const select = document.createElement ('select');

  options.forEach ((option) => {
    const optionElement = document.createElement ('option');
    optionElement.value = option;
    optionElement.innerText = option;
    select.appendChild (optionElement);
  });

  parent.appendChild (select);
};

selectCardUi.createLearningRates = function () {
  this.learningRates.forEach ((learningRate) => {
    this.createOptions (learningRate, this.options.learningRate);
  });
};

selectCardUi.createActivations = function () {
  this.activations.forEach ((activation) => {
    this.createOptions (activation, this.options.activation);
  });
};

selectCardUi.createRegularizations = function () {
  this.regularizations.forEach ((regularization) => {
    this.createOptions (regularization, this.options.regularization);
  });
};

selectCardUi.createRegularizationRates = function () {
  this.regularizationRates.forEach ((regularizationRate) => {
    this.createOptions (regularizationRate, this.options.regularizationRate);
  });
};

selectCardUi.updateCard = function () {
  const { selectedNodes } = playgroundFacade;
  if (selectedNodes.length === 0) {
    this.node.style ('display', 'none');
    return;
  }

  this.node.style ('display', 'block');

  this.rows.forEach ((row, index) => {
    // single selection
    if (selectedNodes.length === 1) {
      const link = networkState.getNeuron (selectedNodes[0]).neuron.inputLinks[index];

      if (typeof link === 'undefined') {
        this.setWeight (index);
        this.setBias (index);
        this.setLearningRate (index);
        this.setActivation (index);
        this.setRegularization (index);
        this.setRegularizationRate (index);
        return;
      }

      const weight = link.weight;
      const bias = link.source.bias;

      if (link.isDead === true) {
        this.setWeight (index);
        this.setBias (index);
        this.setLearningRate (index);
        this.setActivation (index);
        this.setRegularization (index);
        this.setRegularizationRate (index);
      }
      else {
        this.setWeight (index, weight);
        this.setBias (index, bias);
        this.setLearningRate (index, link.source.learningRate);
        this.setActivation (index, link.source.activation.name);
        this.setRegularization (index, link.source.regularization.name);
        this.setRegularizationRate (index, link.source.regularizationRate);
      }
    }
    // multi selection
    else {
      this.setWeight (index, null);
      this.setBias (index, null);
      this.setLearningRate (index, null);
      this.setActivation (index, null);
      this.setRegularization (index, null);
      this.setRegularizationRate (index, null);
    }
  });

  // dumb refresh if only one node is selected
  if (selectedNodes.length === 1) {
    requestAnimationFrame (() => this.updateCard ());
  }
};

selectCardUi.attachEvents = function () {
  if (this.weights) {
    this.weights.forEach ((weight, index) => {
      weight.onchange = (e: InputEvent) => {
        const value = parseFloat ((e.target as HTMLInputElement).value);
        networkState.setWeight (index, value);
        playgroundFacade.updateUI ();
        weight.blur ();
      };
    });
  }

  if (this.learningRates) {
    this.learningRates.forEach ((learningRate, index) => {
      learningRate.children[0].onchange = (e: InputEvent) => {
        const value = parseFloat ((e.target as HTMLInputElement).value);
        networkState.updateSourceLearningRate (index, value);
      };
    });
  }

  if (this.activations) {
    this.activations.forEach ((activation, index) => {
      activation.children[0].onchange = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        networkState.updateSourceActivation (index, value);
      };
    });
  }

  if (this.regularizations) {
    this.regularizations.forEach ((regularization, index) => {
      regularization.children[0].onchange = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        networkState.updateSourceRegularization (index, value);
      };
    });
  }

  if (this.regularizationRates) {
    this.regularizationRates.forEach ((regularizationRate, index) => {
      regularizationRate.children[0].onchange = (e: InputEvent) => {
        const value = parseFloat ((e.target as HTMLInputElement).value);
        networkState.updateSourceRegularizationRate (index, value);
      };
    });
  }
};

selectCardUi.setInput = function (pool, index, payload) {
  const isFocused = pool[index] === document.activeElement;
  if (isFocused) {
    return;
  }

  if (typeof payload === 'undefined') {
    pool[index].disabled = true;
    pool[index].value = null;
  }
  else if (payload === null) {
    pool[index].disabled = false;
    pool[index].value = null;
  }
  else {
    pool[index].disabled = false;
    pool[index].value = payload.toFixed (3);
  }
};

selectCardUi.setWeight = function (index, weight?) {
  this.setInput (this.weights, index, weight);
};

selectCardUi.setBias = function (index, bias?) {
  this.setInput (this.biases, index, bias);
};

selectCardUi.setDropdown = function (pool, index, payload) {
  const didNotChange = pool[index].children[0].value === payload;
  if (didNotChange) {
    return;
  }

  if (typeof payload === 'undefined') {
    pool[index].children[0].disabled = true;
    pool[index].children[0].value = null;
  }
  else if (payload === null) {
    pool[index].children[0].disabled = false;
    pool[index].children[0].value = null;
  }
  else {
    pool[index].children[0].disabled = false;
    pool[index].children[0].value = payload;
  }
};

selectCardUi.setLearningRate = function (index, learningRate?) {
  this.setDropdown (this.learningRates, index, learningRate);
};

selectCardUi.setActivation = function (index, activation?) {
  this.setDropdown (this.activations, index, activation);
};

selectCardUi.setRegularization = function (index, regularization?) {
  this.setDropdown (this.regularizations, index, regularization);
};

selectCardUi.setRegularizationRate = function (index, regularizationRate?) {
  this.setDropdown (this.regularizationRates, index, regularizationRate);
};
