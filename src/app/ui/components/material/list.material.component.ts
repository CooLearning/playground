/**
 * Create a material list component.
 *
 * @param {Array<string|HTMLElement>} items - The list items.
 * @returns {HTMLUListElement} The material list component.
 */
export function ListMaterialComponent (items: Array<(string | HTMLElement)>): HTMLUListElement {
  if (!items) {
    throw new Error ('items is not defined');
  }
  if (!Array.isArray (items)) {
    throw new Error ('items is not an array');
  }

  const ul = document.createElement ('ul');
  ul.classList.add ('mdl-list');

  for (let i = 0; i < items.length; ++i) {
    const item = items[i];

    const li = document.createElement ('li');
    li.classList.add ('mdl-list__item');
    li.appendTo (ul);

    const content = document.createElement ('span');
    content.classList.add ('mdl-list__item-primary-content');
    content.appendTo (li);

    const icon = document.createElement ('i');
    icon.classList.add ('material-icons');
    icon.classList.add ('mdl-list__item-icon');
    icon.innerText = 'person';
    icon.appendTo (content);

    if (item instanceof HTMLElement) {
      item.appendTo (content);
    } else if (typeof item === 'string') {
      const span = document.createElement ('span');
      span.innerText = item;
      span.appendTo (content);
    }
  }

  return ul;
}
