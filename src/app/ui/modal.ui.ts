import { ModalComponent } from './components/modal.component';
import { CLASSES, PARAMETERS } from '../../coolearning/constants';
import { state } from '../../coolearning/state';

export const modalUi = Object.create (null);

modalUi.container = null;
modalUi.content = null;

modalUi.init = function () {
  const { container, content } = ModalComponent ();
  this.container = container;
  this.content = content;
  document.body.insertBefore (this.container, document.body.firstChild);

  this.populateContent ();
};

modalUi.show = function () {
  this.container.style.display = 'block';
};

modalUi.hide = function () {
  this.container.style.display = 'none';
};

modalUi.populateContent = function () {
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
  Object.keys (PARAMETERS).forEach ((parameter) => {
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
    state.render (parameter);
  });
};
