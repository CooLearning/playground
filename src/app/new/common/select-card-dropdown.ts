import {Node} from '../../../playground/nn';
import {LinkAttribute} from '../../constants';

export class SelectCardDropdown {
  private node: HTMLDivElement;

  private readonly dropdown: HTMLSelectElement;

  private options: (string | number)[];

  constructor(node: HTMLDivElement, options: (string | number)[]) {
    this.node = node;
    this.options = options;

    this.dropdown = this.createDropdown();
    this.node.appendChild(this.dropdown);
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

    if (
      typeof link === 'undefined'
      || link.isDead
      || typeof attribute === 'undefined'
    ) {
      this.disable();
      return;
    }

    let payload;
    if (attribute === LinkAttribute.learningRate) {
      payload = link.source.learningRate;
    }
    else if (attribute === LinkAttribute.activation) {
      payload = link.source.activation.name;
    }
    else if (attribute === LinkAttribute.regularization) {
      payload = link.source.regularization.name;
    }
    else if (attribute === LinkAttribute.regularizationRate) {
      payload = link.source.regularizationRate;
    }

    if (typeof payload === 'number') {
      payload = payload.toString();
    }

    this.render(payload);
  }

  private createDropdown() {
    const select = document.createElement('select');

    this.options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.textContent = option.toString();
      select.appendChild(optionElement);
    });

    return select;
  }

  private render(payload?: string) {
    this.dropdown.disabled = false;
    this.dropdown.value = payload || '';
  }

  private disable() {
    this.dropdown.disabled = true;
    this.dropdown.value = '';
  }
}
