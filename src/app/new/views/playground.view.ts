interface Inputs {
  x: HTMLDivElement;
  y: HTMLDivElement;
  xSquared: HTMLDivElement;
  ySquared: HTMLDivElement;
  xTimesY: HTMLDivElement;
  sinX: HTMLDivElement;
  sinY: HTMLDivElement;
}

interface Neurons {
  [key: string]: HTMLDivElement;
}

export class PlaygroundView {
  public inputs: Inputs = {
    x: document.getElementById('canvas-x') as HTMLDivElement,
    y: document.getElementById('canvas-y') as HTMLDivElement,
    xSquared: document.getElementById('canvas-xSquared') as HTMLDivElement,
    ySquared: document.getElementById('canvas-ySquared') as HTMLDivElement,
    xTimesY: document.getElementById('canvas-xTimesY') as HTMLDivElement,
    sinX: document.getElementById('canvas-sinX') as HTMLDivElement,
    sinY: document.getElementById('canvas-sinY') as HTMLDivElement,
  };

  public neurons: Neurons = {};

  public output = document.getElementById('heatmap').children[0].children[0] as HTMLCanvasElement;

  public layers = Array.from(document.querySelectorAll('.plus-minus-neurons')) as HTMLDivElement[];

  public classNames = {
    disabled: 'disabled',
    selected: 'selected',
  };

  constructor() {
    this.fetchNeurons();
    this.addLayerStyles();
  }

  public toggleInput(input: HTMLDivElement): void {
    this.toggleClass(input, this.classNames.disabled);
  }

  public fetchNeurons(): void {
    const totalNeurons = this.layers.length * 8;

    for (let i = 1; i <= totalNeurons; ++i) {
      this.neurons = {
        ...this.neurons,
        [i]: document.getElementById(`canvas-${i}`),
      };
    }
  }

  public toggleNeuronSelection(index: number): void {
    const neuron = this.neurons[index];
    this.toggleClass(neuron, this.classNames.selected);
  }

  public selectLayer(layer: HTMLDivElement): void {
    layer.style.background = 'yellow';
  }

  public unselectLayer(layer: HTMLDivElement): void {
    layer.style.background = null;
  }

  public hideOtherLayersThan(layer: HTMLDivElement): void {
    const otherLayers = this.layers.filter((l) => l !== layer);

    otherLayers.forEach((l) => {
      this.unselectLayer(l);
    });
  }

  private addLayerStyles() {
    this.layers.forEach((layer) => {
      layer.style.outline = '1px solid black';
      layer.style.cursor = 'pointer';
      layer.style.userSelect = 'none';
      layer.style.height = '28px';

      const container = layer.children[0] as HTMLDivElement;
      container.style.height = '100%';
    });
  }

  private toggleClass(element: HTMLDivElement, className: string) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
    else {
      element.classList.add(className);
    }
  }
}
