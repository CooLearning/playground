import {
  addToSelectedNodes,
  removeFromSelectedNodes,
  network as importedNetwork,
  selectedNodes as importedSelectedNodes,
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
