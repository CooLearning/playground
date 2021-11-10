import { ModalComponent } from './components/modal.component';
import { CLASSES, SETTINGS } from '../../coolearning/constants';
import { parametersUi } from './parameters.ui';
import { isTabActive } from '../../coolearning/utils/is-tab-active';
import { getSetting } from '../../coolearning/utils/get-setting';
import { SettingsActions, SettingsPositions } from '../../coolearning/enums';
import { createSettingsActionButton } from '../../coolearning/utils/create-settings-action-button';
import { mappingState } from '../state/mapping.state';

/**
 * View model for the modal component.
 * Contains the mappings.
 */
export const modalUi = Object.create (null);

modalUi.container = null;
modalUi.content = null;

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
  Object.keys (parametersUi.nodes).forEach ((parameter) => {
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
            mappingState.unlearn (parameter);
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
