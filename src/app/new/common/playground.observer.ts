export interface PlaygroundObserver {
  onNeuronClick?(neurons: number[]): void;

  onInputClick?(index: string): void;

  onLayerClick?(index: number): void;
}
