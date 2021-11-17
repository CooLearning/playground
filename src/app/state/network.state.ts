import { playgroundFacade } from '../facades/playground.facade';
import { Link } from './network.state.types';
import { activations, regularizations } from '../../playground/state';
import { selectorDevice } from '../devices/selector.device';

/**
 * State object for the network.
 * It contains nodes.
 * Nodes are either inputs, neurons or output.
 */
export const networkState = Object.create (null);

Object.defineProperty (networkState, 'nodes', {
  get () {
    return playgroundFacade.network;
  },
});

Object.defineProperty (networkState, 'inputs', {
  get () {
    return this.nodes[0];
  },
});

Object.defineProperty (networkState, 'neurons', {
  get () {
    return this.nodes.slice (1, -1);
  },
});

Object.defineProperty (networkState, 'output', {
  get () {
    return this.nodes[this.nodes.length - 1][0];
  },
});

type GetNeuronAndLayerIndexes = {
  neuronIndex: number;
  layerIndex: number;
}

/**
 * Get the neuron and layer indexes from the node id.
 *
 * @param {number} nodeIndex - The node index.
 * @returns {GetNeuronAndLayerIndexes} - The neuron and layer indexes.
 */
networkState.getNeuronAndLayerIndexes = function (nodeIndex: number): GetNeuronAndLayerIndexes {
  if (typeof nodeIndex !== 'number') {
    throw new Error ('nodeIndex is not a number');
  }

  const neuronsPerLayer = 8;
  const layerIndex = Math.trunc ((nodeIndex - 1) / neuronsPerLayer) + 1;

  let neuronIndex;
  if (nodeIndex % neuronsPerLayer === 0) {
    neuronIndex = neuronsPerLayer;
  }
  else {
    neuronIndex = nodeIndex % neuronsPerLayer;
  }

  return {
    neuronIndex,
    layerIndex,
  };
};

type GetNeuron = {
  neuron: Node;
  isEnabled: boolean;
}

/**
 * Get the neuron object from the node id.
 *
 * @param {number} nodeIndex - The node index.
 * @returns {GetNeuron} - The neuron object and whether it is enabled.
 */
networkState.getNeuron = function (nodeIndex: number): GetNeuron {
  const { neuronIndex, layerIndex } = this.getNeuronAndLayerIndexes (nodeIndex);
  const neuron = this.neurons[layerIndex - 1][neuronIndex - 1];
  const { isEnabled } = neuron;
  return {
    neuron,
    isEnabled,
  };
};

networkState.toggleOutput = function (outputIndex: number): void {
  const inputLink = this.output.inputLinks[outputIndex];

  if (!inputLink.source.isEnabled) {
    inputLink.isDead = true;
    inputLink.weight = 0;
    return;
  }

  if (!inputLink.source.isEnabled) {
    inputLink.isDead = true;
    inputLink.weight = 0;
    return;
  }

  inputLink.isDead = !inputLink.isDead;
  inputLink.weight = !inputLink.isDead
    ? Math.random () - 0.5
    : 0;
};

networkState.toggleNeuron = function (nodeIndex: number): void {
  const { neuron, isEnabled } = this.getNeuron (nodeIndex);

  neuron.isEnabled = !isEnabled;

  // input weights
  neuron.inputLinks.forEach ((link: Link) => {
    if (link.source.isEnabled === false) {
      return;
    }

    if (neuron.isEnabled) {
      link.isDead = false;
      link.weight = link.savedWeight || Math.random () - 0.5;
    }
    else {
      link.isDead = true;
      link.savedWeight = link.weight;
      link.weight = 0;
    }
  });

  // output weights
  neuron.outputs.forEach ((link: Link) => {
    if (link.dest.isEnabled === false) {
      return;
    }

    if (neuron.isEnabled) {
      link.isDead = false;
      link.weight = link.savedWeight || Math.random () - 0.5;
    }
    else {
      link.isDead = true;
      link.savedWeight = link.weight;
      link.weight = 0;
    }
  });
};

networkState.toggleLayer = function (index: number): void {
  const neurons = this.neurons[index];
  neurons.forEach ((neuron) => {
    const nodeIndex = parseInt (neuron.id);
    this.toggleNeuron (nodeIndex);
    selectorDevice.setNeuronLight ({
      index: nodeIndex,
      isDisabled: !neuron.isEnabled,
    });
    playgroundFacade.updateUI ();
  });
};

networkState.getInputByIndex = function (index: number) {
  return this.inputs[index];
};

networkState.toggleInput = function (slug: string): any {
  const input = this.inputs.filter ((input) => input.id === slug)[0];
  input.isEnabled = !input.isEnabled;

  input.outputs.forEach ((outputLink) => {
    if (!outputLink.dest.isEnabled) {
      outputLink.isDead = true;
      outputLink.weight = 0;
      return;
    }

    outputLink.isDead = !input.isEnabled;
    outputLink.weight = input.isEnabled
      ? Math.random () - 0.5
      : 0;
  });
  return input;
};

networkState.getSelectedNeurons = function () {
  const { selectedNodes } = playgroundFacade;

  let targets; // neuron or neurons

  if (selectedNodes.length === 0) {
    return;
  }
  else if (selectedNodes.length === 1) {
    targets = [this.getNeuron (selectedNodes[0]).neuron];
  }
  else {
    targets = selectedNodes.map ((i) => this.getNeuron (i).neuron);
  }
  return targets;
};

networkState.setSourceWeight = function (index, value): boolean {
  let hasChanged = false;

  const selectedNeurons = this.getSelectedNeurons ();
  selectedNeurons.forEach ((neuron) => {
    const link = neuron.inputLinks?.[index];
    if (
      typeof link === 'undefined'
      || link?.isDead
      || typeof link?.weight === 'undefined'
    ) {
      return;
    }

    link.weight = value;
    hasChanged = true;
  });

  return hasChanged;
};

networkState.setSourceBias = function (index, value): boolean {
  let hasChanged = false;

  const selectedNeurons = this.getSelectedNeurons ();
  selectedNeurons.forEach ((neuron) => {
    const link = neuron.inputLinks?.[index];
    if (
      typeof link === 'undefined'
      || link?.isDead
      || typeof link?.source?.bias === 'undefined'
    ) {
      return;
    }

    link.source.bias = value;
    hasChanged = true;
  });

  return hasChanged;
};

networkState.setSourceLearningRate = function (index, value): boolean {
  let hasChanged = false;

  const selectedNeurons = this.getSelectedNeurons ();
  selectedNeurons.forEach ((neuron) => {
    const link = neuron.inputLinks?.[index];
    if (
      typeof link === 'undefined'
      || link?.isDead
      || value === link.source.learningRate
    ) {
      return;
    }

    link.source.learningRate = value;
    hasChanged = true;
  });

  return hasChanged;
};

networkState.setSourceActivation = function (index, name): boolean {
  let hasChanged = false;

  const selectedNeurons = this.getSelectedNeurons ();
  selectedNeurons.forEach ((neuron) => {
    const link = neuron.inputLinks?.[index];
    if (
      typeof link === 'undefined'
      || link?.isDead
      || name === link.source.activation.name
    ) {
      return;
    }

    link.source.activation = activations[name];
    hasChanged = true;
  });

  return hasChanged;
};

networkState.setSourceRegularizationType = function (index, name): boolean {
  let hasChanged = false;

  const selectedNeurons = this.getSelectedNeurons ();
  selectedNeurons.forEach ((neuron) => {
    const link = neuron.inputLinks?.[index];
    if (
      typeof link === 'undefined'
      || link?.isDead
      || name === link.source.regularization.name
    ) {
      return;
    }

    link.source.regularization = regularizations[name];
    hasChanged = true;
  });

  return hasChanged;
};

networkState.setSourceRegularizationRate = function (index, value): boolean {
  let hasChanged = false;

  const selectedNeurons = this.getSelectedNeurons ();
  selectedNeurons.forEach ((neuron) => {
    const link = neuron.inputLinks?.[index];
    if (
      typeof link === 'undefined'
      || link?.isDead
      || value === link.source.regularizationRate
    ) {
      return;
    }

    link.source.regularizationRate = value;
    hasChanged = true;
  });

  return hasChanged;
};

networkState.setBias = function (index: number, value: number): boolean {
  let hasChanged = false;
  const neurons = this.neurons[this.selectedLayerIndex];
  const neuron = neurons[index];

  if (
    neuron.isEnabled === false
    || typeof neuron?.bias === 'undefined'
    || value === neuron?.bias
  ) {
    return hasChanged;
  }

  neuron.bias = value;

  hasChanged = true;
  return hasChanged;
};

networkState.setLearningRate = function (index: number, value: number): boolean {
  let hasChanged = false;
  const neurons = this.neurons[this.selectedLayerIndex];
  const neuron = neurons[index];

  if (
    neuron.isEnabled === false
    || value === neuron.learningRate
  ) {
    return hasChanged;
  }

  neuron.learningRate = value;

  hasChanged = true;
  return hasChanged;
};

networkState.setActivation = function (index: number, name: string): boolean {
  let hasChanged = false;
  const neurons = this.neurons[this.selectedLayerIndex];
  const neuron = neurons[index];

  if (
    neuron.isEnabled === false
    || name === neuron.activation.name
  ) {
    return hasChanged;
  }

  neuron.activation = activations[name];

  hasChanged = true;
  return hasChanged;
};

networkState.setRegularizationType = function (index: number, name: string): boolean {
  let hasChanged = false;
  const neurons = this.neurons[this.selectedLayerIndex];
  const neuron = neurons[index];

  if (
    neuron.isEnabled === false
    || name === neuron.regularization.name
  ) {
    return hasChanged;
  }

  neuron.regularization = regularizations[name];

  hasChanged = true;
  return hasChanged;
};

networkState.setRegularizationRate = function (index: number, value: number): boolean {
  let hasChanged = false;
  const neurons = this.neurons[this.selectedLayerIndex];
  const neuron = neurons[index];

  if (
    neuron.isEnabled === false
    || typeof neuron?.regularizationRate === 'undefined'
    || value === neuron?.regularizationRate
  ) {
    return hasChanged;
  }

  neuron.regularizationRate = value;

  hasChanged = true;
  return hasChanged;
};

networkState.selectedLayerIndex = null;

Object.defineProperty (networkState, 'isLayerMode', {
  get () {
    return this.selectedLayerIndex !== null;
  },
});

networkState.setLayer = function (index: number) {
  if (this.selectedLayerIndex === null) {
    // no layer selected
    this.selectedLayerIndex = index;
  }
  else if (index !== this.selectedLayerIndex) {
    // switch layer
    this.selectedLayerIndex = index;
  }
  else {
    // toggle layer
    this.selectedLayerIndex = null;
  }
  return this.selectedLayerIndex;
};

networkState.resetLayerSelection = function () {
  this.selectedLayerIndex = null;
};
