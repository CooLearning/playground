/**
 * Create a material dialog component.
 *
 * @param {string} titleText - The title text.
 * @param {string|HTMLElement} contentText - The content text.
 * @param {number} width - The expected width of the dialog.
 * @param {number} fullWidth - The full width of the dialog.
 * @param {string} closeText - The text for the close button.
 * @returns {HTMLDialogElement} The dialog element.
 */
export function DialogMaterialComponent (
  titleText: string,
  contentText: string | HTMLElement,
  width: number,
  fullWidth = false,
  closeText = 'close',
): HTMLDialogElement {
  if (!titleText) {
    throw new Error ('title is not defined');
  }
  if (typeof titleText !== 'string') {
    throw new Error ('title is not a string');
  }

  if (!contentText) {
    throw new Error ('content is not defined');
  }
  if (!(
    typeof contentText === 'string'
    || contentText instanceof HTMLElement
  )) {
    throw new Error ('content is nor a string, nor an instance of HTMLElement');
  }

  if (!width) {
    throw new Error ('width is not defined');
  }
  if (typeof width !== 'number') {
    throw new Error ('width is not a number');
  }

  // container
  const dialog = document.createElement ('dialog') as HTMLDialogElement;
  dialog.classList.add ('mdl-dialog');
  dialog.style.width = `${width}px`;

  // title
  const title = document.createElement ('h4');
  title.classList.add ('mdl-dialog__title');
  title.innerText = titleText;
  dialog.appendChild (title);

  // content
  const content = document.createElement ('div');
  content.classList.add ('mdl-dialog__content');

  if (contentText instanceof HTMLElement) {
    content.appendChild (contentText);
  } else if (typeof contentText === 'string') {
    const paragraph = document.createElement ('p');
    paragraph.innerText = contentText;
    content.appendChild (paragraph);
  }

  dialog.appendChild (content);

  // actions
  const actions = document.createElement ('div');
  actions.classList.add ('mdl-dialog__actions');

  if (fullWidth) {
    actions.classList.add ('mdl-dialog__actions--full-width');
  }

  dialog.appendChild (actions);

  // action: close button
  const closeButton = document.createElement ('button');
  closeButton.type = 'button';
  closeButton.classList.add ('mdl-button');
  closeButton.innerText = closeText;
  closeButton.onclick = () => dialog.close ();
  actions.appendChild (closeButton);

  // outside event
  dialog.onclick = (e) => {
    // MDL adds `open` HTML attribute to the dialog container (outside) only
    if (!e.target.open) {
      return;
    }
    dialog.close ();
  };

  return dialog;
}
