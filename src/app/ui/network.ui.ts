import * as d3 from 'd3';
import { networkState } from '../state/network.state';
import { selectorDevice } from '../devices/selector.device';

/**
 * View model for the network.
 */
export const networkUi = Object.create (null);

networkUi.toggleNeuron = function (index: number) {
  const { isEnabled } = networkState.getNeuron (index);
  const canvas = d3.select (`#canvas-${index}`);
  canvas.classed ('disabled', isEnabled);

  networkState.toggleNeuron (index);
  selectorDevice.setNeuronColor ({
    index,
    isDisabled: isEnabled,
  });
};

networkUi.toggleInput = function (slug: string, render = false) {
  const input = networkState.toggleInput (slug);
  selectorDevice.setInput (input.id, input.isEnabled);
  if (render) {
    const canvas = d3.select (`#canvas-${slug}`);
    canvas.classed ('disabled', !input.isEnabled);
  }
};
