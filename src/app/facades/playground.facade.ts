// import * as d3 from 'd3';
// import {
//   addToSelectedNodes,
//   removeFromSelectedNodes,
//   network as importedNetwork,
//   selectedNodes as importedSelectedNodes,
//   updateUI,
//   player,
//   updateWeightsUI,
//   updateBiasesUI,
// } from '../../playground/playground';
// import { selectorDevice } from '../devices/selector.device';
//
// export const playgroundFacade = Object.create (null);
//
// /**
//  * Return the playground network, as is.
//  */
// Object.defineProperty (playgroundFacade, 'network', {
//   get () {
//     return importedNetwork;
//   },
// });
//
// /**
//  * Return the playground selectedNodes, as is.
//  */
// Object.defineProperty (playgroundFacade, 'selectedNodes', {
//   get () {
//     return importedSelectedNodes;
//   },
// });
//
// /**
//  * Access to the playground selectedNodes adder function.
//  */
// Object.defineProperty (playgroundFacade, 'selectNode', {
//   get () {
//     return addToSelectedNodes;
//   },
// });
//
// /**
//  * Access to the playground selectedNodes remover function.
//  */
// Object.defineProperty (playgroundFacade, 'unselectNode', {
//   get () {
//     return removeFromSelectedNodes;
//   },
// });
//
// /**
//  * Access to the playground updateUI function.
//  */
// playgroundFacade.updateUI = function () {
//   if (this.isPlaying !== true) {
//     updateUI ();
//   }
// };
//
// /**
//  * Access to the playground updateWeightsUI function.
//  */
// playgroundFacade.updateWeightsUI = function () {
//   if (this.isPlaying !== true) {
//     updateWeightsUI (this.network, d3.select ('g.core'));
//   }
// };
//
// /**
//  * Access to the playground updateBiasesUI function.
//  */
// playgroundFacade.updateBiasesUI = function () {
//   if (this.isPlaying !== true) {
//     updateBiasesUI (this.network);
//   }
// };
//
// /**
//  * Returns true if the playground is currently playing.
//  */
// Object.defineProperty (playgroundFacade, 'isPlaying', {
//   get () {
//     return player.getIsPlaying ();
//   },
// });
//
// /**
//  * Access to the playground player play / pause function.
//  *
//  * @returns {boolean} Is the playground playing?
//  */
// playgroundFacade.togglePlayback = function (): boolean {
//   player.playOrPause ();
//   selectorDevice.updateLightPlayback ();
//   return this.isPlaying;
// };
