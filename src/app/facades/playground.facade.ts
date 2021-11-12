import {
  addToSelectedNodes,
  removeFromSelectedNodes,
  network as importedNetwork,
  selectedNodes as importedSelectedNodes,
  updateUI,
  player,
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

Object.defineProperty (playgroundFacade, 'isPlaying', {
  get () {
    return player.getIsPlaying ();
  },
});

playgroundFacade.togglePlayback = function () {
  player.playOrPause ();
  return this.isPlaying;
};
