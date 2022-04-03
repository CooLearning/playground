import * as d3 from 'd3';
import {playgroundFacade} from '../facades/playground.facade';
import {networkState} from '../state/network.state';

export const selectCardUi = Object.create(null);

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
  learningRate: [0, 0.00001, 0.0001, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
  activation: ['relu', 'tanh', 'sigmoid', 'linear'],
  regularization: ['none', 'L1', 'L2'],
  regularizationRate: [0, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
};

selectCardUi.init = function() {
  this.fetchCard();
  this.createLearningRates();
  this.createActivations();
  this.createRegularizations();
  this.createRegularizationRates();
  this.attachEvents();
};

selectCardUi.fetchCard = function() {
  this.node = d3.select(this.nodeSelectors.node);
  this.rows = this.node.selectAll(this.nodeSelectors.row)[0];
  this.weights = this.node.selectAll(this.nodeSelectors.weight)[0] || [];
  this.biases = this.node.selectAll(this.nodeSelectors.bias)[0] || [];
  this.learningRates = this.node.selectAll(this.nodeSelectors.learningRate)[0];
  this.activations = this.node.selectAll(this.nodeSelectors.activation)[0];
  this.regularizations = this.node.selectAll(this.nodeSelectors.regularization)[0];
  this.regularizationRates = this.node.selectAll(this.nodeSelectors.regularizationRate)[0];
};

selectCardUi.createOptions = function(parent, options) {
  const select = document.createElement('select');

  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option;
    optionElement.innerText = option;
    select.appendChild(optionElement);
  });

  parent.appendChild(select);
};

selectCardUi.createLearningRates = function() {
  this.learningRates.forEach((learningRate) => {
    this.createOptions(learningRate, this.options.learningRate);
  });
};

selectCardUi.createActivations = function() {
  this.activations.forEach((activation) => {
    this.createOptions(activation, this.options.activation);
  });
};

selectCardUi.createRegularizations = function() {
  this.regularizations.forEach((regularization) => {
    this.createOptions(regularization, this.options.regularization);
  });
};

selectCardUi.createRegularizationRates = function() {
  this.regularizationRates.forEach((regularizationRate) => {
    this.createOptions(regularizationRate, this.options.regularizationRate);
  });
};

selectCardUi.updateCard = function() {
  const {selectedNodes} = playgroundFacade;
  if (selectedNodes.length === 0) {
    this.node.style('display', 'none');
    return;
  }

  this.node.style('display', 'flex');

  this.rows.forEach((row, index) => {
    // single selection
    if (selectedNodes.length === 1) {
      let link;

      if (networkState.isOutputNode(selectedNodes[0])) {
        link = networkState.getOutputNode().inputLinks[index];
      }
      else {
        link = networkState.getNeuron(selectedNodes[0]).neuron.inputLinks[index];
      }

      if (typeof link === 'undefined') {
        this.updateSourceWeight(index);
        this.updateSourceBias(index);
        this.updateSourceLearningRate(index);
        this.updateSourceActivation(index);
        this.updateSourceRegularizationType(index);
        this.updateSourceRegularizationRate(index);
        return;
      }

      const weight = link.weight;
      const bias = link.source.bias;

      if (link.isDead === true) {
        this.updateSourceWeight(index);
        this.updateSourceBias(index);
        this.updateSourceLearningRate(index);
        this.updateSourceActivation(index);
        this.updateSourceRegularizationType(index);
        this.updateSourceRegularizationRate(index);
      }
      else {
        this.updateSourceWeight(index, weight);
        this.updateSourceBias(index, bias);
        this.updateSourceLearningRate(index, link.source.learningRate);
        this.updateSourceActivation(index, link.source.activation.name);
        this.updateSourceRegularizationType(index, link.source.regularization.name);
        this.updateSourceRegularizationRate(index, link.source.regularizationRate);
      }
    }
    // multi selection
    else {
      this.updateSourceWeight(index, null);
      this.updateSourceBias(index, null);
      this.updateSourceLearningRate(index, null);
      this.updateSourceActivation(index, null);
      this.updateSourceRegularizationType(index, null);
      this.updateSourceRegularizationRate(index, null);
    }
  });

  // dumb refresh if only one node is selected
  if (selectedNodes.length === 1) {
    requestAnimationFrame(() => this.updateCard());
  }
};

selectCardUi.attachEvents = function() {
  this.attachSourceWeightsEvents();
  this.attachSourceBiasesEvents();
  this.attachSourceLearningRatesEvents();
  this.attachSourceActivationsEvents();
  this.attachSourceRegularizationTypesEvents();
  this.attachSourceRegularizationRatesEvents();
};

selectCardUi.attachSourceWeightsEvents = function() {
  if (this.weights) {
    this.weights.forEach((weight, index) => {
      weight.onchange = (e: InputEvent) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        const hasChanged = networkState.setSourceWeight(index, value);
        if (hasChanged) {
          playgroundFacade.updateWeightsUI();
        }
        weight.blur();
      };
    });
  }
};

selectCardUi.attachSourceBiasesEvents = function() {
  if (this.biases) {
    this.biases.forEach((bias, index) => {
      bias.onchange = (e: InputEvent) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        const hasChanged = networkState.setSourceBias(index, value);
        if (hasChanged) {
          playgroundFacade.updateBiasesUI();
        }
        bias.blur();
      };
    });
  }
};

selectCardUi.attachSourceLearningRatesEvents = function() {
  if (this.learningRates) {
    this.learningRates.forEach((learningRate, index) => {
      learningRate.children[0].onchange = (e: InputEvent) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        const hasChanged = networkState.setSourceLearningRate(index, value);
        if (hasChanged) {
          playgroundFacade.updateUI();
        }
      };
    });
  }
};

selectCardUi.attachSourceActivationsEvents = function() {
  if (this.activations) {
    this.activations.forEach((activation, index) => {
      activation.children[0].onchange = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        const hasChanged = networkState.setSourceActivation(index, value);
        if (hasChanged) {
          playgroundFacade.updateUI();
        }
      };
    });
  }
};

selectCardUi.attachSourceRegularizationTypesEvents = function() {
  if (this.regularizations) {
    this.regularizations.forEach((regularization, index) => {
      regularization.children[0].onchange = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        const hasChanged = networkState.setSourceRegularizationType(index, value);
        if (hasChanged) {
          playgroundFacade.updateUI();
        }
      };
    });
  }
};

selectCardUi.attachSourceRegularizationRatesEvents = function() {
  if (this.regularizationRates) {
    this.regularizationRates.forEach((regularizationRate, index) => {
      regularizationRate.children[0].onchange = (e: InputEvent) => {
        const value = parseFloat((e.target as HTMLInputElement).value);
        const hasChanged = networkState.setSourceRegularizationRate(index, value);
        if (hasChanged) {
          playgroundFacade.updateUI();
        }
      };
    });
  }
};

selectCardUi.updateSourceWeight = function(index, weight?) {
  this.updateSourceInput(this.weights, index, weight);
  if (weight > 1 || weight < -1) {
    this.weights[index].style.backgroundColor = 'rgba(255,0,0,.2)';
  }
  else {
    this.weights[index].style.backgroundColor = null;
  }
};

selectCardUi.updateSourceBias = function(index, bias?) {
  this.updateSourceInput(this.biases, index, bias);
  if (bias > 1 || bias < -1) {
    this.biases[index].style.backgroundColor = 'rgba(255,0,0,.2)';
  }
  else {
    this.biases[index].style.backgroundColor = null;
  }
};

selectCardUi.updateSourceLearningRate = function(index, learningRate?) {
  this.updateSourceDropdown(this.learningRates, index, learningRate);
};

selectCardUi.updateSourceActivation = function(index, activation?) {
  this.updateSourceDropdown(this.activations, index, activation);
};

selectCardUi.updateSourceRegularizationType = function(index, regularization?) {
  this.updateSourceDropdown(this.regularizations, index, regularization);
};

selectCardUi.updateSourceRegularizationRate = function(index, regularizationRate?) {
  this.updateSourceDropdown(this.regularizationRates, index, regularizationRate);
};

selectCardUi.updateSourceInput = function(pool, index, payload) {
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
    pool[index].value = payload.toFixed(3);
  }
};

selectCardUi.updateSourceDropdown = function(pool, index, payload) {
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
