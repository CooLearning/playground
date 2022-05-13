import {BUTTONS_PARENT} from '../../constants';
import {ModalImportsExportsView} from '../views/modal-imports-exports.view';

export class ModalImportsExportsController {
  private node: HTMLButtonElement;

  private view: ModalImportsExportsView;

  constructor(view: ModalImportsExportsView) {
    this.view = view;

    this.node = BUTTONS_PARENT.querySelector('.imports-exports');

    this.node.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick() {
    this.view.show();
  }
}
