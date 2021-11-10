export const PARAMETERS = {
  playPauseButton: document.getElementById ('play-pause-button'),
  resetButton: document.getElementById ('reset-button'),
  learningRate: document.getElementById ('learningRate'),
  activation: document.getElementById ('activations'),
  regularizations: document.getElementById ('regularizations'),
  regularizationRate: document.getElementById ('regularRate'),
  problemType: document.getElementById ('problem'),
  addLayers: document.getElementById ('add-layers'),
  removeLayers: document.getElementById ('remove-layers'),
  ratioOfTrainingToTest: document.getElementById ('percTrainData'),
  noise: document.getElementById ('noise'),
  batchSize: document.getElementById ('batchSize'),
  showTestData: document.getElementById ('show-test-data').parentNode,
  discretize: document.getElementById ('discretize').parentNode,
};

export const CLASSES = {
  action: 'cool-action',
  actions: {
    learn: 'cool-actions--learn',
    unlearn: 'cool-actions--unlearn',
  },
  settings: {
    container: 'cool-settings--container',
    content: 'cool-settings--content',
  },
};

export const SETTINGS = {
  none: 'N/A',
  button: 'button',
  range: 'range',
};