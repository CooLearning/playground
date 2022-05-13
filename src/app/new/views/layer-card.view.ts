import {Node} from '../../../playground/nn';
import {AbstractLayerCard} from '../common/abstract-layer-card';
import {LinkAttribute} from '../../constants';

export class LayerCardView extends AbstractLayerCard {
  private render;

  constructor() {
    super('layer-card');
  }

  public show(neurons: Node[]): void {
    this.node.style.display = 'flex';
    this.renderElements(neurons);
  }

  public hide(): void {
    this.node.style.display = 'none';
  }

  private renderElements(neurons: Node[]) {
    this.renderBiases(neurons);
    this.renderLearningRates(neurons);
    this.renderActivations(neurons);
    this.renderRegularizations(neurons);
    this.renderRegularizationRates(neurons);
  }

  private renderBiases(neurons: Node[]) {
    this.biases.forEach((bias, index) => {
      bias.update(neurons[index], LinkAttribute.bias);
    });
  }

  private renderLearningRates(neurons: Node[]) {
    this.learningRates.forEach((learningRate, index) => {
      learningRate.update(neurons[index], LinkAttribute.learningRate);
    });
  }

  private renderActivations(neurons: Node[]) {
    this.activations.forEach((activation, index) => {
      activation.update(neurons[index], LinkAttribute.activation);
    });
  }

  private renderRegularizations(neurons: Node[]) {
    this.regularizations.forEach((regularization, index) => {
      regularization.update(neurons[index], LinkAttribute.regularization);
    });
  }

  private renderRegularizationRates(neurons: Node[]) {
    this.regularizationRates.forEach((regularizationRate, index) => {
      regularizationRate.update(neurons[index], LinkAttribute.regularizationRate);
    });
  }
}
