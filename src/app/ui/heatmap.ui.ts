import {networkState} from '../state/network.state';
import {networkUi} from './network.ui';
import {playgroundFacade} from '../facades/playground.facade';

export class HeatmapUi {
  private heatmap: HTMLDivElement;

  private canvas: HTMLDivElement;

  private constructor() {
    this.heatmap = document.querySelector('#heatmap');
    this.canvas = this.heatmap.children[0] as HTMLDivElement;

    this.addStyle();
    this.canvas.onclick = HeatmapUi.handleClick;
  }

  public static init(): HeatmapUi {
    return new HeatmapUi();
  }

  private static handleClick() {
    const id = parseInt(networkState.getOutputNode().id);

    if (playgroundFacade.selectedNodes.indexOf(id) === -1) {
      networkUi.toggleNodeSelection(id, true);
    }
    else {
      networkUi.toggleNodeSelection(id, false);
    }
  }

  private addStyle() {
    this.canvas.style.cursor = 'pointer';
  }
}
