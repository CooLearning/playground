import * as d3 from 'd3';
import {
  addToSelectedNodes,
  removeFromSelectedNodes,
  network as importedNetwork,
  selectedNodes as importedSelectedNodes,
} from '../../playground/playground';
import { neuronCardUi } from '../ui/neuron-card.ui';
import { selectorDevice } from '../devices/selector.device';
import { controllerDevice } from '../devices/controller.device';

export const playgroundFacade = Object.create (null);

Object.defineProperty (playgroundFacade, 'network', {
  get () {
    return importedNetwork;
  },
});

Object.defineProperty (playgroundFacade, 'selectedNodes', {
  get () {
    return importedSelectedNodes;
  },
});

playgroundFacade.toggleNodeSelection = function (nodeIndex: number, isSelected: boolean) {
  if (typeof nodeIndex !== 'number') {
    throw new Error ('nodeId is not a number');
  }

  // playground local state
  if (isSelected) {
    addToSelectedNodes (nodeIndex);
  } else {
    removeFromSelectedNodes (nodeIndex);
  }

  // class
  const canvas = d3.select (`#canvas-${nodeIndex}`);
  canvas.classed ('selected', isSelected);

  neuronCardUi.updateCard (nodeIndex);

  selectorDevice.setNeuronColor ({
    index: nodeIndex,
    isSelected,
  });

  controllerDevice.onSelect ();
};
