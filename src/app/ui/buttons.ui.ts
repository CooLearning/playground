import { ShowButtonComponent } from './components/show-button.component';
import { ResetButtonComponent } from './components/reset-button.component';

export const buttonsUi = Object.create (null);

buttonsUi.show = null;
buttonsUi.reset = null;

buttonsUi.init = function () {
  this.show = ShowButtonComponent ();
  document.body.insertBefore (this.show, document.body.firstChild);

  this.reset = ResetButtonComponent ();
  document.body.insertBefore (this.reset, document.body.firstChild);
};
