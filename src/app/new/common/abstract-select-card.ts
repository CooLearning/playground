import {SelectCardInput} from './select-card-input';
import {SelectCardDropdown} from './select-card-dropdown';

export abstract class AbstractSelectCard {
  public weights: SelectCardInput[] = [];

  public biases: SelectCardInput[] = [];

  public learningRates: SelectCardDropdown[] = [];

  public activations: SelectCardDropdown[] = [];

  public regularizations: SelectCardDropdown[] = [];

  public regularizationRates: SelectCardDropdown[] = [];

  protected node: HTMLDivElement;

  private options = {
    learningRates: [0, 0.00001, 0.0001, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
    activations: ['relu', 'tanh', 'sigmoid', 'linear'],
    regularizations: ['none', 'L1', 'L2'],
    regularizationRates: [0, 0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10],
  };

  protected constructor(selector: string, addWeights = false) {
    this.node = document.getElementById(selector) as HTMLDivElement;

    if (addWeights) {
      const weights = Array.from(this.node.querySelectorAll('input.weight'));
      weights.forEach((weight: HTMLInputElement, index) => {
        this.weights[index] = new SelectCardInput(weight);
      });
    }

    const biases = Array.from(this.node.querySelectorAll('input.bias'));
    biases.forEach((bias: HTMLInputElement, index) => {
      this.biases[index] = new SelectCardInput(bias);
    });

    const learningRates = Array.from(this.node.querySelectorAll('div.learning-rate'));
    learningRates.forEach((learningRate: HTMLDivElement, index) => {
      this.learningRates[index] = new SelectCardDropdown(learningRate, this.options.learningRates);
    });

    const activations = Array.from(this.node.querySelectorAll('div.activation'));
    activations.forEach((activation: HTMLDivElement, index) => {
      this.activations[index] = new SelectCardDropdown(activation, this.options.activations);
    });

    const regularizations = Array.from(this.node.querySelectorAll('div.regularization'));
    regularizations.forEach((regularization: HTMLDivElement, index) => {
      this.regularizations[index] = new SelectCardDropdown(regularization, this.options.regularizations);
    });

    const regularizationRates = Array.from(this.node.querySelectorAll('div.regularization-rate'));
    regularizationRates.forEach((regularizationRate: HTMLDivElement, index) => {
      this.regularizationRates[index] = new SelectCardDropdown(regularizationRate, this.options.regularizationRates);
    });
  }
}
