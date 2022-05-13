import {Node} from '../../../playground/nn';
import {SelectCardView} from '../views/select-card.view';
import {NetworkObserver} from '../common/network.observer';

export class SelectCardController implements NetworkObserver {
  private view: SelectCardView;

  constructor(view: SelectCardView) {
    this.view = view;

    this.view.weights.forEach((weight) => {
      weight.onChange(this.handleWeightChange.bind(this));
    });

    this.view.biases.forEach((bias) => {
      bias.onChange(this.handleBiasChange.bind(this));
    });

    this.view.learningRates.forEach((learningRate) => {
      learningRate.onChange(this.handleLearningRateChange.bind(this));
    });

    this.view.activations.forEach((activation) => {
      activation.onChange(this.handleActivationChange.bind(this));
    });

    this.view.regularizations.forEach((regularization) => {
      regularization.onChange(this.handleRegularizationChange.bind(this));
    });

    this.view.regularizationRates.forEach((regularizationRate) => {
      regularizationRate.onChange(this.handleRegularizationRateChange.bind(this));
    });
  }

  public onNeuronSelection(neurons: Node[]): void {
    if (neurons.length === 0) {
      this.view.hide();
      return;
    }

    this.view.show(neurons);
  }

  private handleWeightChange(e) {
    const target = e.target as HTMLInputElement;
    const weight = Number(target.value);
    console.log(weight);
    // todo: update weight in network state
    // this.state.network.setWeight(weight, notify=false);
    target.blur();
  }

  private handleBiasChange(e) {
    const target = e.target as HTMLInputElement;
    const bias = Number(target.value);
    console.log(bias);
    // todo: update bias in network state
    target.blur();
  }

  private handleLearningRateChange(e) {
    const target = e.target as HTMLSelectElement;
    const learningRate = Number(target.value);
    console.log(learningRate);
    // todo
  }

  private handleActivationChange(e) {
    const target = e.target as HTMLSelectElement;
    const activation = target.value;
    console.log(activation);
    // todo
  }

  private handleRegularizationChange(e) {
    const target = e.target as HTMLSelectElement;
    const regularization = target.value;
    console.log(regularization);
    // todo
  }

  private handleRegularizationRateChange(e) {
    const target = e.target as HTMLInputElement;
    const regularizationRate = Number(target.value);
    console.log(regularizationRate);
    // todo
  }
}
