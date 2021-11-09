import { dialogUi } from './dialog.ui';
import { modalUi } from './modal.ui';
import { buttonsUi } from './buttons.ui';
import { notificationsUi } from './notifications.ui';
import { neuronCardUi } from './neuron-card.ui';

export const ui = Object.create (null);

/**
 * Initialize the UI.
 */
ui.init = async function () {
  this.addMaterialScript ();

  await notificationsUi.init ();
  modalUi.init ();
  buttonsUi.init ();
  dialogUi.init ();
  neuronCardUi.init ();

  notificationsUi.notify ('test');
};

/**
 * Add missing Material Design Lite script to the page.
 *
 * @todo this should be a local resource
 */
ui.addMaterialScript = function () {
  const script = document.createElement ('script');
  script.src = 'https://code.getmdl.io/1.3.0/material.min.js';

  script.onload = () => {
    window.componentHandler.upgradeAllRegistered ();
  };

  document.head.appendChild (script);
};
