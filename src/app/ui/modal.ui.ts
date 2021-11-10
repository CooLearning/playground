import { ModalComponent } from './components/modal.component';
import { CLASSES, SETTINGS } from '../../coolearning/constants';
import { isTabActive } from '../../coolearning/utils/is-tab-active';
import { getSetting } from '../../coolearning/utils/get-setting';
import { SettingsActions, SettingsPositions } from '../../coolearning/enums';
import { createSettingsActionButton } from '../../coolearning/utils/create-settings-action-button';
import { mappingState } from '../state/mapping.state';
import { notificationsUi } from './notifications.ui';
import { rangeMap } from '../utils/range-map';

/**
 * View model for the modal component.
 * Contains the mappings.
 */
export const modalUi = Object.create (null);

modalUi.container = null;
modalUi.content = null;
modalUi.parameters = {
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

modalUi.init = function () {
  const { container, content } = ModalComponent ();
  this.container = container;
  this.content = content;
  document.body.insertBefore (this.container, document.body.firstChild);
  this.buildMappings ();
};

modalUi.show = function () {
  this.container.style.display = 'block';
};

modalUi.hide = function () {
  this.container.style.display = 'none';
};

/**
 * @todo split logic into separate functions
 */
modalUi.buildMappings = function () {
  // styles
  this.content.style.display = 'flex';
  this.content.style.flexDirection = 'column';
  this.content.style.justifyContent = 'center';
  this.content.style.alignItems = 'center';
  this.content.style.textAlign = 'center';
  this.content.style.gridGap = '0.5em';

  // first row
  this.content.innerHTML = `
    <div style="
        display: grid;
        grid-template-columns: repeat(4, 20vw);
        font-weight: bold;
        background: gainsboro;
    ">
      <div>Parameter</div>
      <div>Control</div>
      <div>Control Type</div>
      <div>Actions</div>
    </div>
  `;

  // next rows with parameters and controls
  // skeleton only
  Object.keys (modalUi.parameters).forEach ((parameter) => {
    this.content.innerHTML += `
      <div class="${CLASSES.action}" style="
        display: grid;
        grid-template-columns: repeat(4, 20vw);
      ">
        <div>${parameter}</div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  });

  // actions listeners
  const actions = document.getElementsByClassName (CLASSES.action);
  Array.from (actions).forEach ((action: any) => {
    const parameter: string = action.firstElementChild.innerText;
    modalUi.updateMapping (parameter);
  });
};

modalUi.updateMapping = function (parameter, control = undefined, type = undefined): void {
  if (!isTabActive ()) {
    return;
  }
  if (!parameter) {
    throw new Error ('parameter is not defined');
  }
  if (typeof parameter !== 'string') {
    throw new Error ('parameter is not a string');
  }

  const setting = getSetting (parameter);

  if (!setting) {
    throw new Error ('error getting setting');
  }

  const children = Array.from (setting.children);
  const learned = control && type;

  children.forEach ((child: any, key) => {
    switch (key) {
      case SettingsPositions.Parameter:
        break;
      case SettingsPositions.Control:
        child.innerText = learned
          ? control
          : SETTINGS.none;
        break;
      case SettingsPositions.Type:
        child.innerText = learned
          ? type
          : SETTINGS.none;
        break;
      case SettingsPositions.Action:
        child.innerHTML = createSettingsActionButton ({
          action: learned ? SettingsActions.Unlearn : SettingsActions.Learn,
          parameter,
        });
        child.onclick = () => {
          if (learned) {
            this.unlearn (parameter);
          } else {
            mappingState.enableLearningMode (parameter);
          }
        };
        break;
      default:
        break;
    }
  });
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
modalUi.learn = function ({
  parameter,
  control,
  type,
}: LearnOptions) {
  if (mappingState.isMapped (parameter)) {
    return;
  }

  mappingState.setParameterMaps ({ parameter, control, type });
  modalUi.updateMapping (parameter, control, type);
  notificationsUi.notify (
    `Learn: control ${control} for ${parameter} (${type})`,
  );
};

/**
 * Unlearn a mapping between a parameter and a control.
 *
 * @param {string} parameter - The parameter to unlearn.
 */
modalUi.unlearn = function (parameter: string) {
  if (!mappingState.isMapped (parameter)) {
    return;
  }
  mappingState.unsetParameterMaps (parameter);
  modalUi.updateMapping (parameter);
  notificationsUi.notify (`${parameter} unlearned`);

  // saveState ();
};

/**
 * Render the parameters UI.
 *
 * @param {string} name - The name of the parameter to render.
 * @param {number} value - The value of the parameter to render.
 */
modalUi.renderParameter = function (name: string, value: number): void {
  if (typeof name === 'undefined') {
    throw new Error ('parameter is not defined');
  }
  if (typeof value === 'undefined') {
    throw new Error ('value is not defined');
  }
  if (!isTabActive ()) {
    return;
  }

  const parameter = this.parameters[name];
  if (!parameter) {
    throw new Error ('parameter name was not found in listed nodes');
  }

  // render the parameter depending on its HTML nature.
  switch (parameter.tagName) {
    case 'SELECT': {
      const length = parameter.children.length - 1;
      const scaledValue = rangeMap (value, 0, 127, 0, length);
      const scaledInteger = parseInt (scaledValue.toString ());
      const areDifferent = scaledInteger !== parameter.selectedIndex;

      if (areDifferent) {
        parameter.selectedIndex = scaledInteger;
        parameter.dispatchEvent (new Event ('change'));
      }

      break;
    }

    case 'BUTTON': {
      parameter.click ();
      break;
    }

    case 'INPUT': {
      const min = parseInt (parameter.min);
      const max = parseInt (parameter.max);
      const step = parseInt (parameter.step);

      const v = rangeMap (value, 0, 127, min, max);
      const n = parseInt (v.toString ());
      const isStep = (n % step) === 0;
      const areDifferent = n !== parseInt (parameter.value);

      if (isStep && areDifferent) {
        parameter.value = n.toString ();
        parameter.dispatchEvent (new Event ('input'));
      }

      break;
    }

    case 'LABEL': {
      if (value === 0) {
        return;
      }
      parameter.click ();
      break;
    }

    default:
      throw new Error (`${parameter.tagName} target not handled`);
  }
};
