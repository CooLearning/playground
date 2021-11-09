import { IconMaterialComponent } from './icon.material.component';

/**
 * Create a material chip element
 *
 * @param {string} type - The type of the chip
 * @param {string} content - The content of the chip
 * @param {Function} handleClick - The function to handle the click event
 * @returns {HTMLElement} - The material chip element
 */
export function ChipMaterialComponent (
  type: string,
  content: string,
  handleClick: (e: PointerEvent) => void,
): HTMLSpanElement {
  if (!type) {
    throw new Error ('type not defined');
  }
  if (!content) {
    throw new Error ('content not defined');
  }
  if (!handleClick) {
    throw new Error ('onActionClick not defined');
  }

  // container
  const chip = document.createElement ('span');
  chip.classList.add ('mdl-chip');
  chip.classList.add ('mdl-chip--contact');
  chip.classList.add ('mdl-chip--deletable');

  // icon
  // default image https://getmdl.io/templates/dashboard/images/user.jpg
  const icon = document.createElement ('img');
  icon.classList.add ('mdl-chip__contact');

  if (type === 'button') {
    icon.src = 'https://static.thenounproject.com/png/55809-200.png';
    icon.style.background = 'rgba(0,255,0,.4)';
  } else if (type === 'range') {
    icon.src = 'https://static.thenounproject.com/png/949831-200.png';
    icon.style.background = 'rgba(0,0,255,.4)';
  } else {
    throw new Error ('type not found');
  }

  icon.appendTo (chip);

  // text
  const text = document.createElement ('span');
  text.classList.add ('mdl-chip__text');
  text.style.userSelect = 'none';
  text.innerHTML = content;
  text.appendTo (chip);

  // action
  const action = document.createElement ('a');
  action.classList.add ('mdl-chip__action');
  action.appendChild (IconMaterialComponent ('cancel'));
  action.onclick = handleClick;
  action.appendTo (chip);

  return chip;
}
