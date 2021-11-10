/**
 * Create a material icon component
 *
 * @param {string} slug - The slug of the icon
 * @param {string} [marginTop] - The margin-top of the icon
 * @returns {HTMLElement} - The material icon component
 */
export function IconMaterialComponent (slug: string, marginTop?: string): HTMLElement {
  const element = document.createElement ('i');
  element.classList.add ('material-icons');
  element.innerText = slug;
  if (typeof marginTop !== 'undefined') {
    element.style.marginTop = marginTop;
  }
  return element;
}
