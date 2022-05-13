import {BUTTONS_PARENT} from '../../constants';
import {ModalHelpView} from '../views/modal-help.view';

export class ModalHelpController {
  private readonly button: HTMLButtonElement;

  private view: ModalHelpView;

  constructor(view: ModalHelpView) {
    this.view = view;
    this.button = BUTTONS_PARENT.querySelector('.help');

    this.button.addEventListener('click', this.handleButtonClick.bind(this));

    this.view.titles.forEach((title) => {
      title.addEventListener('click', this.handleTitleClick.bind(this));
    });

    this.view.images.forEach((image) => {
      image.addEventListener('click', this.handleImageClick.bind(this));
    });
  }

  private handleButtonClick() {
    this.view.show();
  }

  private handleTitleClick(e) {
    const target = e.target as HTMLHeadingElement;
    this.view.showByTitle(target);
  }

  private handleImageClick(e) {
    const target = e.target as HTMLImageElement;
    this.view.hideImage(target.parentElement);
  }
}
