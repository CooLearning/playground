/**
 * Create a material icon component
 *
 * @param {string} slug - The slug of the icon
 * @returns {HTMLElement} - The material icon component
 */
export function IconMaterialComponent (slug: string): HTMLElement {
  const element = document.createElement ('i');
  element.classList.add ('material-icons');
  element.innerText = slug;
  return element;
}
