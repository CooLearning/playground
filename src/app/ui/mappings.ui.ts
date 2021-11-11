import { dialogPrototype } from './prototypes/dialog.prototype';
import { mappingsState } from '../state/mappings.state';
import { notificationsUi } from './notifications.ui';
import { MappingChipComponent } from './components/mapping-chip.component';

/**
 * View model for the dialog component.
 * Contains the mappings.
 *
 * @augments dialogPrototype
 */
export const mappingsUi = Object.create (dialogPrototype);

mappingsUi.nodeSelectors = {
  node: '#mappings',
  closeButton: '.close-button',
  content: '.mdl-dialog__content',
  tableContent: '.table-content',
};

mappingsUi.parameterQueries = {
  playPauseButton: document.getElementById ('play-pause-button'),
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

mappingsUi.chips = {};

mappingsUi.init = function () {
  this.node = document.querySelector (this.nodeSelectors.node);
  this.closeButton = this.node.querySelector (this.nodeSelectors.closeButton);
  this.content = this.node.querySelector (this.nodeSelectors.content);
  this.tableContent = this.node.querySelector (this.nodeSelectors.tableContent);
  this.buildTableContent ();
  this.attachEvents (this.closeButton);
};

mappingsUi.buildTableContent = function () {
  Object.keys (this.parameterQueries).forEach ((parameterName) => {
    this.tableContent.appendChild (this.createContentRow (parameterName));
  });
};

mappingsUi.createContentCell = function () {
  const cell = document.createElement ('td');
  cell.classList.add ('mdl-data-table__cell--non-numeric');
  return cell;
};

mappingsUi.createContentRow = function (parameterName: string) {
  const row = document.createElement ('tr');

  const parameterElement = this.createContentCell ();
  parameterElement.innerText = parameterName;

  const chip = new MappingChipComponent ({ name: parameterName });
  this.chips[parameterName] = chip;

  const mappingElement = this.createContentCell ();
  mappingElement.appendChild (chip.getNode ());

  row.appendChild (parameterElement);
  row.appendChild (mappingElement);

  return row;
};

type LearnOptions = {
  parameter: string;
  control: number;
  type: string;
}

/**
 * Learn a mapping between a parameter and a control.
 *
 * @param {LearnOptions} options - The options for learning.
 */
mappingsUi.learn = function ({
  parameter,
  control,
  type,
}: LearnOptions) {
  if (mappingsState.isMapped (parameter)) {
    return;
  }

  mappingsState.setParameterMaps ({ parameter, control, type });

  this.chips[parameter].update ({
    icon: type,
    content: control,
    isLearned: true,
  });

  notificationsUi.notify (
    `Learn: control ${control} for ${parameter} (${type})`,
  );
};

/**
 * Unlearn a mapping between a parameter and a control.
 *
 * @param {string} parameter - The parameter to unlearn.
 */
mappingsUi.unlearn = function (parameter: string) {
  if (!mappingsState.isMapped (parameter)) {
    return;
  }

  mappingsState.unsetParameterMaps (parameter);

  this.chips[parameter].reset ();

  notificationsUi.notify (`${parameter} unlearned`);
};
