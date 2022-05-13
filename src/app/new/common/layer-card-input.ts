import {Node} from '../../../playground/nn';
import {LinkAttribute} from '../../constants';

export class LayerCardInput {
  private node: HTMLInputElement;

  constructor(node: HTMLInputElement) {
    this.node = node;
  }

  public onChange(callback: (e: Event) => unknown): void {
    this.node.addEventListener('change', callback);
  }

  public update(neuron: Node, attribute: LinkAttribute): void {
    let payload;

    if (attribute === LinkAttribute.bias) {
      payload = neuron.bias.toFixed(3);
    }

    this.render(payload);

    if (!neuron.isEnabled) {
      this.node.disabled = true;
    }
  }

  private render(payload?: string) {
    this.node.disabled = false;
    this.node.value = payload || '';
  }

  private disable() {
    this.node.disabled = true;
    this.node.value = '';
  }
}
