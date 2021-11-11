import * as d3 from 'd3';
import { networkState } from '../state/network.state';
import { selectorDevice } from '../devices/selector.device';
import { playgroundFacade } from '../facades/playground.facade';
import { neuronCardUi } from './neuron-card.ui';
import { controllerDevice } from '../devices/controller.device';

/**
 * View model for the network.
 */
export const networkUi = Object.create (null);

networkUi.toggleNeuron = function (index: number) {
  const { isEnabled } = networkState.getNeuron (index);
  const nextEnabled = !isEnabled;
  const canvas = d3.select (`#canvas-${index}`);
  canvas.classed ('disabled', !nextEnabled);

  if (nextEnabled === false) {
    this.toggleNodeSelection (index, false);
  }

  networkState.toggleNeuron (index);

  selectorDevice.setNeuronLight ({
    index,
    isDisabled: !nextEnabled,
  });
};

networkUi.toggleInput = function (slug: string, render = false) {
  const input = networkState.toggleInput (slug);

  // DOM
  if (render) {
    // todo to deprecate
    const canvas = d3.select (`#canvas-${slug}`);
    canvas.classed ('disabled', !input.isEnabled);
  }

  // device
  if (selectorDevice.isInitialized === true) {
    selectorDevice.setInputLight (input.id, input.isEnabled);
  }
};

networkUi.toggleNodeSelection = function (nodeIndex: number, isSelected: boolean) {
  if (typeof nodeIndex !== 'number') {
    throw new Error ('nodeId is not a number');
  }

  // playground local state
  if (isSelected) {
    playgroundFacade.selectNode (nodeIndex);
  } else {
    playgroundFacade.unselectNode (nodeIndex);
  }

  // class
  const canvas = d3.select (`#canvas-${nodeIndex}`);
  canvas.classed ('selected', isSelected);

  neuronCardUi.updateCard (nodeIndex);

  selectorDevice.setNeuronLight ({
    index: nodeIndex,
    isSelected,
  });

  controllerDevice.onSelectionEvent ();
};
