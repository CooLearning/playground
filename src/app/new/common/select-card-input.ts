import {Node} from '../../../playground/nn';
import {LinkAttribute} from '../../constants';

export class SelectCardInput {
  private node: HTMLInputElement;

  constructor(node: HTMLInputElement) {
    this.node = node;
  }

  public onChange(callback: (e: Event) => unknown): void {
    this.node.addEventListener('change', callback);
  }

  public update(neuron: Node, index: number, attribute: LinkAttribute): void {
    if (!neuron) {
      this.render();
      return;
    }

    const link = neuron.inputLinks[index];

    if (typeof link === 'undefined') {
      this.disable();
      return;
    }

    if (link.isDead) {
      this.disable();
      return;
    }

    let payload;
    if (typeof attribute === 'undefined') {
      payload = '';
    }
    else if (attribute === LinkAttribute.weight) {
      payload = link.weight.toFixed(3);
    }
    else if (attribute === LinkAttribute.bias) {
      payload = link.source.bias.toFixed(3);
    }

    this.render(payload);
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
