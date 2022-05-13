import {Node} from '../../../playground/nn';
import {AbstractSelectCard} from '../common/abstract-select-card';
import {LinkAttribute} from '../../constants';

export class SelectCardView extends AbstractSelectCard {
  constructor() {
    super('select-card', true);
  }

  public show(neurons: Node[]): void {
    this.node.style.display = 'flex';
    this.renderElements(neurons);
  }

  public hide(): void {
    this.node.style.display = 'none';
  }

  private renderElements(neurons: Node[]) {
    if (neurons.length === 1) {
      const neuron = neurons[0];
      this.renderWeights(neuron);
      this.renderBiases(neuron);
      this.renderLearningRates(neuron);
      this.renderActivations(neuron);
      this.renderRegularizations(neuron);
      this.renderRegularizationRates(neuron);
    }
    else {
      this.renderWeights();
      this.renderBiases();
      this.renderLearningRates();
      this.renderActivations();
      this.renderRegularizations();
      this.renderRegularizationRates();
    }
  }

  private renderWeights(neuron?: Node) {
    this.weights.forEach((weight, index) => {
      weight.update(neuron, index, LinkAttribute.weight);
    });
  }

  private renderBiases(neuron?: Node) {
    this.biases.forEach((bias, index) => {
      bias.update(neuron, index, LinkAttribute.bias);
    });
  }

  private renderLearningRates(neuron?: Node) {
    this.learningRates.forEach((learningRate, index) => {
      learningRate.update(neuron, index, LinkAttribute.learningRate);
    });
  }

  private renderActivations(neuron?: Node) {
    this.activations.forEach((activation, index) => {
      activation.update(neuron, index, LinkAttribute.activation);
    });
  }

  private renderRegularizations(neuron?: Node) {
    this.regularizations.forEach((regularization, index) => {
      regularization.update(neuron, index, LinkAttribute.regularization);
    });
  }

  private renderRegularizationRates(neuron?: Node) {
    this.regularizationRates.forEach((regularizationRate, index) => {
      regularizationRate.update(neuron, index, LinkAttribute.regularizationRate);
    });
  }
}
