import { INITIAL_STATE } from './constants';

export type State = typeof INITIAL_STATE
export type Parameter = string
export type ControlIdentifier = number
export type ControlType = string

export type NeuronElement = HTMLDivElement
export type Neurons = {
  [index: string]: {
    element: NeuronElement,
    layerPosition: number, // CSS left position
    layerIndex: number, // start at 1, from left to right
  }
}
