import {PlaygroundView} from '../views/playground.view';
import {PlaygroundObserver} from '../common/playground.observer';
import {ShortAndLongClick} from '../common/short-and-long-click';
import {PlaygroundFacade} from '../facades/playground.facade';

export class PlaygroundController {
  private view: PlaygroundView;

  private observers: PlaygroundObserver[] = [];

  constructor(view: PlaygroundView) {
    this.view = view;

    this.setInputEvents();
    this.setNeuronEvents();
    this.setLayerEvents();
  }

  public addObserver(observer: PlaygroundObserver): void {
    this.observers.push(observer);
  }

  private setInputEvents() {
    Object.keys(this.view.inputs).forEach((key) => {
      this.view.inputs[key].addEventListener('click', this.handleInputClick.bind(this));
    });
  }

  private setNeuronEvents() {
    Object.keys(this.view.neurons).forEach((key) => {
      ShortAndLongClick.create({
        element: this.view.neurons[key],
        handleShortClick: this.handleNeuronShortClick.bind(this),
        handleLongClick: this.handleNeuronLongClick.bind(this),
      });
    });
  }

  private setLayerEvents() {
    Object.keys(this.view.layers).forEach((key) => {
      this.view.layers[key].addEventListener('click', this.handleLayerClick.bind(this));
    });
  }

  private notifyNeuronClick() {
    this.observers.forEach((observer) => {
      if (observer?.onNeuronClick) {
        observer.onNeuronClick(PlaygroundFacade.selection);
      }
    });
  }

  private notifyInputClick(index: string) {
    this.observers.forEach((observer) => {
      if (observer?.onInputClick) {
        observer.onInputClick(index);
      }
    });
  }

  private notifyLayerClick(index?: number) {
    this.observers.forEach((observer) => {
      if (observer?.onLayerClick) {
        observer.onLayerClick(index);
      }
    });
  }

  private getCanvasSlug(container: HTMLDivElement): string {
    return container.id.split('canvas-')[1];
  }

  private getLayerIndex(container: HTMLDivElement): number {
    const layer = container.children[0] as HTMLDivElement;
    return Number(layer.textContent.split('Layer ')[1]);
  }

  private handleInputClick(e) {
    const target = e.target as HTMLCanvasElement;
    const input = target.parentElement.parentElement as HTMLDivElement;
    const slug = this.getCanvasSlug(input);

    this.view.toggleInput(input);
    this.notifyInputClick(slug);
  }

  private handleNeuronShortClick(e) {
    const canvas = e.target as HTMLCanvasElement;
    const parent = canvas.parentElement.parentElement as HTMLDivElement;

    if (parent.classList.contains(this.view.classNames.disabled)) {
      return;
    }

    const index = Number(this.getCanvasSlug(parent));

    PlaygroundFacade.toggleNeuronSelection(index);
    this.view.toggleNeuronSelection(index);
    this.notifyNeuronClick();
  }

  private handleNeuronLongClick(e) {
    console.log('long', e);
  }

  private handleLayerClick(e) {
    const target = e.target as HTMLDivElement;
    const layer = target.parentElement as HTMLDivElement;
    const index = this.getLayerIndex(layer);

    if (layer.style.background === null || layer.style.background === '') {
      this.view.hideOtherLayersThan(layer);
      this.view.selectLayer(layer);
      this.notifyLayerClick(index);
    }
    else {
      this.view.unselectLayer(layer);
      this.notifyLayerClick();
    }
  }
}
