import * as d3 from 'd3';
import {networkState} from '../state/network.state';
import {selectorDevice} from '../devices/selector.device';
import {playgroundFacade} from '../facades/playground.facade';
import {selectCardUi} from './select-card.ui';
import {controllerDevice} from '../devices/controller.device';

/**
 * View model for the network.
 */
export const networkUi = Object.create(null);

networkUi.toggleNeuron = function(index: number) {
  if (networkState.isLayerMode) {
    return;
  }

  const {isEnabled} = networkState.getNeuron(index);
  const nextEnabled = !isEnabled;
  const canvas = d3.select(`#canvas-${index}`);
  canvas.classed('disabled', !nextEnabled);

  if (nextEnabled === false) {
    this.toggleNodeSelection(index, false);
  }

  networkState.toggleNeuron(index);

  selectCardUi.updateCard();
  playgroundFacade.updateWeightsUI();

  selectorDevice.setNeuronLight({
    index,
    isDisabled: !nextEnabled,
  });
};

networkUi.toggleInput = function(slug: string) {
  if (networkState.isLayerMode) {
    return;
  }

  const input = networkState.toggleInput(slug);

  // DOM
  const canvas = d3.select(`#canvas-${slug}`);
  canvas.classed('disabled', !input.isEnabled);

  playgroundFacade.updateWeightsUI();

  // device
  if (selectorDevice.isInitialized === true) {
    selectorDevice.setInputLight(input.id, input.isEnabled);
  }
};

networkUi.toggleNodeSelection = function(nodeIndex: number, isSelected: boolean) {
  if (networkState.isLayerMode) {
    return;
  }

  if (typeof nodeIndex !== 'number') {
    throw new Error('nodeId is not a number');
  }

  // playground local state
  if (isSelected) {
    playgroundFacade.selectNode(nodeIndex);
  }
  else {
    playgroundFacade.unselectNode(nodeIndex);
  }

  // class
  const canvas = d3.select(`#canvas-${nodeIndex}`);
  canvas.classed('selected', isSelected);

  selectCardUi.updateCard();

  selectorDevice.setNeuronLight({index: nodeIndex, isSelected});
  controllerDevice.onSelectionEvent();
};
