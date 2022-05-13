import {networkState} from '../state/network.state';

export class MetricsUi {
  private metrics: HTMLDivElement;

  private bias: HTMLDivElement;

  private biasValue: HTMLDivElement;

  private constructor() {
    this.metrics = document.querySelector('.metrics');

    this.createBias();
    this.createBiasValue();
    this.updateBiasValue();
  }

  public static init(): MetricsUi {
    return new MetricsUi();
  }

  private createBias() {
    this.bias = document.createElement('div');
    this.bias.classList.add('output-stats');
    this.bias.classList.add('train');

    const title = document.createElement('span');
    title.innerText = 'Bias ';

    this.bias.appendChild(title);

    this.metrics.appendChild(this.bias);
  }

  private createBiasValue() {
    this.biasValue = document.createElement('div');
    this.biasValue.innerText = '0.0';

    this.biasValue.classList.add('value');

    this.bias.appendChild(this.biasValue);
  }

  // todo: very dummy implementation
  public updateBiasValue(): void {
    setInterval(() => {
      const value = networkState.getOutputNode().bias.toFixed(3).toString();

      if (this.biasValue.innerText !== value) {
        this.biasValue.innerText = value;
      }
    }, 100);
  }
}
