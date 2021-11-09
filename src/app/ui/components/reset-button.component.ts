import { state } from '../../../coolearning/state';
import { IconMaterialComponent } from './material/icon.material.component';
import { ButtonMaterialComponent } from './material/button.material.component';

/**
 * Button to reset the settings.
 *
 * @returns {HTMLButtonElement} The button.
 */
export function ResetButtonComponent (): HTMLButtonElement {
  const icon = IconMaterialComponent ('eject');
  icon.style.marginTop = '-1px';

  const button = ButtonMaterialComponent (icon, () => state.reset ());
  button.style.display = 'block';
  button.style.position = 'fixed';
  button.style.bottom = '6px';
  button.style.left = '52px';

  return button;
}
