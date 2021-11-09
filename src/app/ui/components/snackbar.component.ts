/**
 * Snackbar to show notifications.
 *
 * @see https://getmdl.io/components/index.html#snackbar-section
 * @returns {HTMLDivElement} Snackbar
 */
export function SnackbarComponent (): HTMLDivElement {
  const snackbar = document.createElement ('div');
  snackbar.classList.add ('mdl-js-snackbar');
  snackbar.classList.add ('mdl-snackbar');

  const message = document.createElement ('div');
  message.classList.add ('mdl-snackbar__text');
  snackbar.appendChild (message);

  const action = document.createElement ('button');
  action.classList.add ('mdl-snackbar__action');
  action.type = 'button';
  snackbar.appendChild (action);

  return snackbar;
}
