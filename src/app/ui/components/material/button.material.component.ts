/**
 * Create a material button component
 *
 * @param {HTMLElement} icon - The icon to use
 * @param {Function} handleClick - The click handler
 * @returns {HTMLButtonElement} - The button element
 */
export function ButtonMaterialComponent (
  icon: HTMLElement,
  handleClick: () => void = undefined,
): HTMLButtonElement {
  if (!icon) {
    throw new Error ('icon is not defined');
  }

  const button = document.createElement ('button');

  button.classList.add ('mdl-button');
  button.classList.add ('mdl-js-button');
  button.classList.add ('mdl-button--fab');
  button.classList.add ('mdl-button--mini-fab');
  button.classList.add ('mdl-js-ripple-effect');

  button.appendChild (icon);

  if (handleClick && typeof handleClick === 'function') {
    button.addEventListener ('click', handleClick);
  }

  return button;
}
