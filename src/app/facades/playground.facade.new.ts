// import * as d3 from 'd3';
// import {
//   addToSelectedNodes,
//   network as importedNetwork,
//   player,
//   removeFromSelectedNodes,
//   selectedNodes as importedSelectedNodes,
//   updateBiasesUI,
//   updateUI,
//   updateWeightsUI,
// } from '../../playground/playground';
// import {selectorDevice} from '../devices/selector.device';
//
// export class PlaygroundFacadeNew {
//   public static get selectedNodes(): number[] {
//     return importedSelectedNodes;
//   }
//
//   public static get isPlaying(): boolean {
//     return player.getIsPlaying();
//   }
//
//   public static get network(): typeof importedNetwork {
//     return importedNetwork;
//   }
//
//   public static get selectNode() {
//     return addToSelectedNodes;
//   }
//
//   public static get unselectNode() {
//     return removeFromSelectedNodes;
//   }
//
//   public static togglePlayback(): boolean {
//     player.playOrPause();
//     selectorDevice.updateLightPlayback();
//     return this.isPlaying;
//   }
//
//   public static updateWeightsUI(): void {
//     if (this.isPlaying) {
//       return;
//     }
//
//     updateWeightsUI(this.network, d3.select('g.core'));
//   }
//
//   public static updateUI(): void {
//     if (this.isPlaying) {
//       return;
//     }
//
//     updateUI();
//   }
//
//   public static updateBiasesUI(): void {
//     if (this.isPlaying) {
//       return;
//     }
//
//     updateBiasesUI(this.network);
//   }
// }
