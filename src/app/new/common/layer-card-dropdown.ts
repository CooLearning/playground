import {Node} from '../../../playground/nn';
import {LinkAttribute} from '../../constants';

export class LayerCardDropdown {
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

  public update(neuron: Node, attribute: LinkAttribute): void {
    let payload;

    if (attribute === LinkAttribute.learningRate) {
      payload = neuron.learningRate;
    }
    else if (attribute === LinkAttribute.activation) {
      payload = neuron.activation.name;
    }
    else if (attribute === LinkAttribute.regularization) {
      payload = neuron.regularization.name;
    }
    else if (attribute === LinkAttribute.regularizationRate) {
      payload = neuron.regularizationRate.toString();
    }

    this.render(payload);

    if (!neuron.isEnabled) {
      this.dropdown.disabled = true;
    }
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
