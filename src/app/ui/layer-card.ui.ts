import { selectCardUi } from './select-card.ui';
import { networkState } from '../state/network.state';
import { playgroundFacade } from '../facades/playground.facade';

export const layerCardUi = Object.create (selectCardUi);

layerCardUi.nodeSelectors = {
  ...layerCardUi.nodeSelectors,
  node: '#layer-card',
};

layerCardUi.init = function () {
  this.fetchCard ();
  this.createLearningRates ();
  this.createActivations ();
  this.createRegularizations ();
  this.createRegularizationRates ();
  this.attachEvents ();
};

layerCardUi.updateCard = function () {
  if (networkState.selectedLayerIndex === null) {
    this.node.style ('display', 'none');
    return;
  }

  const neurons = networkState.neurons[networkState.selectedLayerIndex];

  neurons.forEach ((neuron, index) => {
    this.updateBias (index);
    this.updateLearningRate (index);
    this.updateActivation (index);
    this.updateRegularizationType (index);
    this.updateRegularizationRate (index);
  });

  this.node.style ('display', 'flex');
};

layerCardUi.attachEvents = function () {
  this.attachBiasesEvents ();
  this.attachLearningRatesEvents ();
  this.attachActivationsEvents ();
  this.attachRegularizationTypesEvents ();
  this.attachRegularizationRatesEvents ();
};

layerCardUi.attachBiasesEvents = function () {
  if (this.biases) {
    this.biases.forEach ((bias, index) => {
      bias.onchange = (e: InputEvent) => {
        const value = parseFloat ((e.target as HTMLInputElement).value);
        const hasChanged = networkState.setBias (index, value);
        if (hasChanged) {
          playgroundFacade.updateUI ();
        }
        bias.blur ();
      };
    });
  }
};

layerCardUi.attachLearningRatesEvents = function () {
  if (this.learningRates) {
    this.learningRates.forEach ((learningRate, index) => {
      learningRate.children[0].onchange = (e: InputEvent) => {
        const value = parseFloat ((e.target as HTMLInputElement).value);
        const hasChanged = networkState.setLearningRate (index, value);
        if (hasChanged) {
          playgroundFacade.updateUI ();
        }
      };
    });
  }
};

layerCardUi.attachActivationsEvents = function () {
  if (this.activations) {
    this.activations.forEach ((activation, index) => {
      activation.children[0].onchange = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        const hasChanged = networkState.setActivation (index, value);
        if (hasChanged) {
          playgroundFacade.updateUI ();
        }
      };
    });
  }
};

layerCardUi.attachRegularizationTypesEvents = function () {
  if (this.regularizations) {
    this.regularizations.forEach ((regularization, index) => {
      regularization.children[0].onchange = (e: InputEvent) => {
        const value = (e.target as HTMLInputElement).value;
        const hasChanged = networkState.setRegularizationType (index, value);
        if (hasChanged) {
          playgroundFacade.updateUI ();
        }
      };
    });
  }
};

layerCardUi.attachRegularizationRatesEvents = function () {
  if (this.regularizationRates) {
    this.regularizationRates.forEach ((regularizationRate, index) => {
      regularizationRate.children[0].onchange = (e: InputEvent) => {
        const value = parseFloat ((e.target as HTMLInputElement).value);
        const hasChanged = networkState.setRegularizationRate (index, value);
        if (hasChanged) {
          playgroundFacade.updateUI ();
        }
      };
    });
  }
};

layerCardUi.updateBias = function (index) {
  const neurons = networkState.neurons[networkState.selectedLayerIndex];
  const neuron = neurons[index];
  this.biases[index].value = neuron.bias.toFixed (3);
  this.biases[index].disabled = !neuron.isEnabled;
};

layerCardUi.updateLearningRate = function (index) {
  const neurons = networkState.neurons[networkState.selectedLayerIndex];
  const neuron = neurons[index];
  this.learningRates[index].children[0].value = neuron.learningRate;
  this.learningRates[index].children[0].disabled = !neuron.isEnabled;
};

layerCardUi.updateActivation = function (index) {
  const neurons = networkState.neurons[networkState.selectedLayerIndex];
  const neuron = neurons[index];
  this.activations[index].children[0].value = neuron.activation.name;
  this.activations[index].children[0].disabled = !neuron.isEnabled;
};

layerCardUi.updateRegularizationType = function (index) {
  const neurons = networkState.neurons[networkState.selectedLayerIndex];
  const neuron = neurons[index];
  this.regularizations[index].children[0].value = neuron.regularization.name;
  this.regularizations[index].children[0].disabled = !neuron.isEnabled;
};

layerCardUi.updateRegularizationRate = function (index) {
  const neurons = networkState.neurons[networkState.selectedLayerIndex];
  const neuron = neurons[index];
  this.regularizationRates[index].children[0].value = neuron.regularizationRate;
  this.regularizationRates[index].children[0].disabled = !neuron.isEnabled;
};
