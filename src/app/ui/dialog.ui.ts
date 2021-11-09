import { ListMaterialComponent } from './components/material/list.material.component';
import { ChipMaterialComponent } from './components/material/chip.material.component';
import { DialogMaterialComponent } from './components/material/dialog.material.component';

export const dialogUi = Object.create (null);

dialogUi.modal = {
  container: null,
  content: null,
};

/**
 * Initialize settings.
 */
dialogUi.init = function () {
  this.createFutureDialog ();
};

/**
 * Create future dialog.
 *
 * @todo programmed for future use
 */
dialogUi.createFutureDialog = function () {
  const list = ListMaterialComponent ([
    'first',
    'second',
    ChipMaterialComponent (
      'button',
      'hello',
      // eslint-disable-next-line no-console
      () => console.log ('button'),
    ),
    ChipMaterialComponent (
      'range',
      '75',
      // eslint-disable-next-line no-console
      () => console.log ('range'),
    ),
  ]);

  const dialog = DialogMaterialComponent (
    'Settings',
    list,
    650,
  );

  document.body.appendChild (dialog);
};
