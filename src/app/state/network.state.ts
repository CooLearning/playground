import { playgroundFacade } from '../facades/playground.facade';
import { Link } from './network.state.types';
import { activations, regularizations } from '../../playground/state';

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

networkState.setWeight = function (index, value) {
  this.getSelectedNeurons ().forEach ((neuron) => {
    const weight = neuron.inputLinks?.[index]?.weight;
    if (typeof weight !== 'undefined') {
      neuron.inputLinks[index].weight = value;
    }
  });
};

networkState.updateSourceLearningRate = function (index, value) {
  this.getSelectedNeurons ().forEach ((neuron) => {
    neuron.inputLinks[index].source.learningRate = value;
  });
};

networkState.setLearningRate = function (index: number, value: number): void {
  const { neuron } = this.getNeuron (index);
  neuron.learningRate = value;
};

networkState.updateSourceActivation = function (index, value) {
  this.getSelectedNeurons ().forEach ((neuron) => {
    neuron.inputLinks[index].source.activation = activations[value];
  });
};

networkState.setActivation = function (index: number, name: string): void {
  if (typeof index === 'undefined') {
    throw new Error ('index must be defined');
  }
  if (typeof index !== 'number') {
    throw new Error ('index must be a number');
  }
  if (typeof name === 'undefined') {
    throw new Error ('name must be defined');
  }
  if (typeof name !== 'string') {
    throw new Error ('name must be a string');
  }

  const { neuron } = this.getNeuron (index);
  neuron.activation = activations[name];
};

networkState.updateSourceRegularization = function (index, value) {
  this.getSelectedNeurons ().forEach ((neuron) => {
    neuron.inputLinks[index].source.regularization = regularizations[value];
  });
};

networkState.setRegularization = function (index: number, name: string) {
  if (typeof index === 'undefined') {
    throw new Error ('index must be defined');
  }
  if (typeof index !== 'number') {
    throw new Error ('index must be a number');
  }
  if (typeof name === 'undefined') {
    throw new Error ('name must be defined');
  }
  if (typeof name !== 'string') {
    throw new Error ('name must be a string');
  }

  const { neuron } = this.getNeuron (index);
  neuron.regularization = regularizations[name];
};

networkState.updateSourceRegularizationRate = function (index, value) {
  this.getSelectedNeurons ().forEach ((neuron) => {
    neuron.inputLinks[index].source.regularizationRate = value;
  });
};

networkState.setRegularizationRate = function (index: number, value: number) {
  if (typeof index === 'undefined') {
    throw new Error ('index must be defined');
  }
  if (typeof index !== 'number') {
    throw new Error ('index must be a number');
  }
  if (typeof value === 'undefined') {
    throw new Error ('value must be defined');
  }
  if (typeof value !== 'number') {
    throw new Error ('value must be a number');
  }

  const { neuron } = this.getNeuron (index);
  neuron.regularizationRate = value;
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
