import {Link, Node} from '../../../playground/nn';
import {network} from '../../../playground/playground';
import {PlaygroundObserver} from '../common/playground.observer';
import {PlaygroundFacade} from '../facades/playground.facade';
import {NetworkObserver} from '../common/network.observer';

export class NetworkController implements PlaygroundObserver {
  private observers: NetworkObserver[] = [];

  private inputsBySlug = {
    x: 0,
    y: 1,
    xSquared: 2,
    ySquared: 3,
    xTimesY: 4,
    sinX: 5,
    sinY: 6,
  };

  private readonly network: Node[][];

  private readonly inputs: Node[];

  private readonly neurons: Node[][];

  private readonly output: Node;

  constructor() {
    this.network = network;
    this.inputs = this.network[0];
    this.neurons = this.network.slice(1, -1);
    this.output = this.network[this.network.length - 1][0];
  }

  public addObserver(observer: NetworkObserver): void {
    this.observers.push(observer);
  }

  public onInputClick(slug: string): void {
    const input = this.getInputBySlug(slug);
    this.toggleInput(input);
    PlaygroundFacade.updateWeightsUI();
  }

  public onNeuronClick(selection: number[]): void {
    const neurons = [];

    selection.forEach((index) => {
      const [l, n] = this.getLayerAndLayerIndexes(index);
      const neuron = this.neurons[l][n];
      neurons.push(neuron);
    });

    this.notifyNeuronSelection(neurons);
  }

  public onLayerClick(index: number): void {
    const neurons = this.neurons[index - 1];
    this.notifyLayerSelection(neurons);
  }

  private getLayerAndLayerIndexes(index: number): [number, number] {
    let neuron;
    const neuronsPerLayer = 8;
    const layer = Math.trunc((index - 1) / neuronsPerLayer) + 1;

    if (index % neuronsPerLayer === 0) {
      neuron = neuronsPerLayer;
    }
    else {
      neuron = index % neuronsPerLayer;
    }

    return [layer - 1, neuron - 1];
  }

  private notifyNeuronSelection(neurons: Node[]) {
    this.observers.forEach((observer) => {
      if (observer.onNeuronSelection) {
        observer.onNeuronSelection(neurons);
      }
    });
  }

  private notifyLayerSelection(neurons: Node[]) {
    this.observers.forEach((observer) => {
      if (observer.onLayerSelection) {
        observer.onLayerSelection(neurons);
      }
    });
  }

  private getInputBySlug(slug: string): Node {
    const index = this.inputsBySlug[slug];
    return this.inputs[index];
  }

  private isDestinationActive(link: Link): boolean {
    return link.dest.isEnabled;
  }

  private killLink(link: Link) {
    const isDead = true;
    const weight = 0;

    if (link.isDead !== isDead && link.weight !== weight) {
      link.isDead = isDead;
      link.weight = weight;
    }
  }

  private toggleLink(link: Link, currentState: boolean) {
    const isDead = !currentState;
    const weight = currentState ? Math.random() - 0.5 : 0;

    if (link.isDead !== isDead && link.weight !== weight) {
      link.isDead = isDead;
      link.weight = weight;
    }
  }

  private toggleInput(input: Node) {
    input.isEnabled = !input.isEnabled;

    input.outputs.forEach((link) => {
      if (!this.isDestinationActive(link)) {
        this.killLink(link);
        return;
      }

      this.toggleLink(link, input.isEnabled);
    });
  }
}
