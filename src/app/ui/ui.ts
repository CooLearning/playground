import { mappingsUi } from './mappings.ui';
import { buttonsUi } from './buttons.ui';
import { notificationsUi } from './notifications.ui';
import { selectCardUi } from './select-card.ui';
import { devicesUi } from './devices.ui';
import { helpUi } from './help.ui';
import { layerCardUi } from './layer-card.ui';
import { importsExportsUi } from './imports-exports.ui';

export const ui = Object.create (null);

/**
 * Initialize the UI.
 */
ui.init = async function () {
  this.addMaterialScript ();

  await notificationsUi.init ();
  mappingsUi.init ();
  buttonsUi.init ();
  selectCardUi.init ();
  layerCardUi.init ();
  devicesUi.init ();
  helpUi.init ();
  importsExportsUi.init ();
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
