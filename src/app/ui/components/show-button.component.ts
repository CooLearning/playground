import { IconMaterialComponent } from './material/icon.material.component';
import { ButtonMaterialComponent } from './material/button.material.component';
import { modalUi } from '../modal.ui';

/**
 * Button to show the settings panel.
 *
 * @returns {HTMLButtonElement} The button.
 */
export function ShowButtonComponent (): HTMLButtonElement {
  const icon = IconMaterialComponent ('settings');

  const button = ButtonMaterialComponent (icon, () => modalUi.show ());
  button.style.display = 'block';
  button.style.position = 'fixed';
  button.style.bottom = '6px';
  button.style.left = '6px';

  return button;
}
