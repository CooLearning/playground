import {LayerCardInput} from './layer-card-input';
import {LayerCardDropdown} from './layer-card-dropdown';

export abstract class AbstractLayerCard {
  public weights: LayerCardInput[] = [];

  public biases: LayerCardInput[] = [];

  public learningRates: LayerCardDropdown[] = [];

  public activations: LayerCardDropdown[] = [];

  public regularizations: LayerCardDropdown[] = [];

  public regularizationRates: LayerCardDropdown[] = [];

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
        this.weights[index] = new LayerCardInput(weight);
      });
    }

    const biases = Array.from(this.node.querySelectorAll('input.bias'));
    biases.forEach((bias: HTMLInputElement, index) => {
      this.biases[index] = new LayerCardInput(bias);
    });

    const learningRates = Array.from(this.node.querySelectorAll('div.learning-rate'));
    learningRates.forEach((learningRate: HTMLDivElement, index) => {
      this.learningRates[index] = new LayerCardDropdown(learningRate, this.options.learningRates);
    });

    const activations = Array.from(this.node.querySelectorAll('div.activation'));
    activations.forEach((activation: HTMLDivElement, index) => {
      this.activations[index] = new LayerCardDropdown(activation, this.options.activations);
    });

    const regularizations = Array.from(this.node.querySelectorAll('div.regularization'));
    regularizations.forEach((regularization: HTMLDivElement, index) => {
      this.regularizations[index] = new LayerCardDropdown(regularization, this.options.regularizations);
    });

    const regularizationRates = Array.from(this.node.querySelectorAll('div.regularization-rate'));
    regularizationRates.forEach((regularizationRate: HTMLDivElement, index) => {
      this.regularizationRates[index] = new LayerCardDropdown(regularizationRate, this.options.regularizationRates);
    });
  }
}
