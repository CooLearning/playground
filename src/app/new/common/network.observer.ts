import {Node} from '../../../playground/nn';

export interface NetworkObserver {
  onNeuronSelection?(selection: Node[]): void;

  onLayerSelection?(selection: Node[]): void;
}
