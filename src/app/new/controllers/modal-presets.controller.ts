import {state} from '../../../playground/playground';
import {BUTTONS_PARENT} from '../../constants';
import {ModalPresetsView} from '../views/modal-presets.view';

export class ModalPresetsController {
  private button: HTMLButtonElement;

  private view: ModalPresetsView;

  private dropdown: HTMLSelectElement;

  constructor(view: ModalPresetsView) {
    this.view = view;

    this.button = BUTTONS_PARENT.querySelector('.presets');

    this.button.addEventListener('click', this.handleClick.bind(this));
    this.view.dropdown.addEventListener('change', this.handleChange.bind(this));
  }

  private handleClick() {
    this.view.show();
  }

  private handleChange() {
    const preset = this.view.dropdown.value;

    if (!preset) {
      return;
    }

    state.networkPreset = preset;
    state.serialize();
    window.location.reload();
  }
}
