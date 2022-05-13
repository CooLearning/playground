import * as d3 from 'd3';
import {
  addToSelectedNodes,
  network,
  player,
  removeFromSelectedNodes,
  selectedNodes,
  updateWeightsUI,
} from '../../../playground/playground';

export class PlaygroundFacade {
  public static get isPlaying(): boolean {
    return player.getIsPlaying();
  }

  public static get selection(): number[] {
    return selectedNodes;
  }

  public static toggleNeuronSelection(index: number): void {
    if (selectedNodes.includes(index)) {
      removeFromSelectedNodes(index);
      return;
    }

    addToSelectedNodes(index);
  }

  public static playOrPause(): void {
    player.playOrPause();
  }

  public static updateWeightsUI(): void {
    if (PlaygroundFacade.isPlaying) {
      return;
    }

    updateWeightsUI(network, d3.select('g.core'));
  }
}
