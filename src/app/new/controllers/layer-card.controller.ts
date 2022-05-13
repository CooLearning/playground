import {LayerCardView} from '../views/layer-card.view';
import {Node} from '../../../playground/nn';
import {NetworkObserver} from '../common/network.observer';

export class LayerCardController implements NetworkObserver {
  private view: LayerCardView;

  constructor(view: LayerCardView) {
    this.view = view;
  }

  public onLayerSelection(neurons?: Node[]): void {
    if (!neurons) {
      this.view.hide();
      return;
    }

    this.view.show(neurons);
  }
}
