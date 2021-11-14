import * as d3 from 'd3';
import {
  addToSelectedNodes,
  removeFromSelectedNodes,
  network as importedNetwork,
  selectedNodes as importedSelectedNodes,
  updateUI,
  player,
  updateWeightsUI,
  updateBiasesUI,
} from '../../playground/playground';

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

Object.defineProperty (playgroundFacade, 'selectNode', {
  get () {
    return addToSelectedNodes;
  },
});

Object.defineProperty (playgroundFacade, 'unselectNode', {
  get () {
    return removeFromSelectedNodes;
  },
});

playgroundFacade.updateUI = function () {
  if (this.isPlaying !== true) {
    updateUI ();
  }
};

playgroundFacade.updateWeightsUI = function () {
  if (this.isPlaying !== true) {
    updateWeightsUI (this.network, d3.select ('g.core'));
  }
};

playgroundFacade.updateBiasesUI = function () {
  if (this.isPlaying !== true) {
    updateBiasesUI (this.network);
  }
};

Object.defineProperty (playgroundFacade, 'isPlaying', {
  get () {
    return player.getIsPlaying ();
  },
});

playgroundFacade.togglePlayback = function () {
  player.playOrPause ();
  return this.isPlaying;
};
