import {BUTTONS_PARENT} from '../../constants';
import {ModalMappingsView} from '../views/modal-mappings.view';

export class ModalMappingsController {
  private node: HTMLButtonElement;

  private view: ModalMappingsView;

  constructor(view: ModalMappingsView) {
    this.view = view;
    this.node = BUTTONS_PARENT.querySelector('.mappings');
    this.node.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick() {
    this.view.show();
  }
}
