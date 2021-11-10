import { CLASSES } from '../../../coolearning/constants';
import { mappingsUi } from '../mappings.ui';

/**
 * Modal to display the settings.
 *
 * @returns {{HTMLDivElement, HTMLDivElement}} - The modal container and the modal content.
 */
export function ModalComponent (): { container: HTMLDivElement; content: HTMLDivElement; } {
  const container = document.createElement ('div');
  const content = document.createElement ('div');

  // styles
  container.classList.add (CLASSES.settings.container);
  container.style.display = 'none';
  container.style.position = 'fixed';
  container.style.justifyContent = 'center';
  container.style.alignItems = 'center';
  container.style.zIndex = '1000';
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.overflow = 'auto';
  container.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';

  content.classList.add (CLASSES.settings.content);
  content.style.backgroundColor = '#fefefe';
  content.style.margin = '30vh auto';
  content.style.padding = '20px';
  content.style.border = '1px solid #888';
  content.style.width = '80vw';

  // click event
  container.addEventListener ('click', (e) => {
    const classes = e.target.classList;
    const isOutside = Array.from (classes).includes (CLASSES.settings.container);
    if (isOutside) {
      mappingsUi.hide ();
    }
  });

  container.appendChild (content);

  return {
    container,
    content,
  };
}
