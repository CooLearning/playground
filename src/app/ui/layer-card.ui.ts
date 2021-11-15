import { selectCardUi } from './select-card.ui';
import { networkState } from '../state/network.state';

export const layerCardUi = Object.create (selectCardUi);

layerCardUi.nodeSelectors = {
  ...layerCardUi.nodeSelectors,
  node: '#layer-card',
};

layerCardUi.updateCard = function () {
  if (networkState.selectedLayerIndex === null) {
    this.node.style ('display', 'none');
    return;
  }

  const neurons = networkState.neurons[networkState.selectedLayerIndex];

  neurons.forEach ((neuron, index) => {
    this.biases[index].value = neuron.bias.toFixed (3);
    this.biases[index].disabled = !neuron.isEnabled;

    this.learningRates[index].children[0].value = neuron.learningRate;
    this.learningRates[index].children[0].disabled = !neuron.isEnabled;

    this.activations[index].children[0].value = neuron.activation.name;
    this.activations[index].children[0].disabled = !neuron.isEnabled;

    this.regularizations[index].children[0].value = neuron.regularization.name;
    this.regularizations[index].children[0].disabled = !neuron.isEnabled;

    this.regularizationRates[index].value = neuron.regularizationRate;
    this.regularizationRates[index].children[0].disabled = !neuron.isEnabled;
  });

  this.node.style ('display', 'flex');

  requestAnimationFrame (this.updateCard.bind (this));
};
