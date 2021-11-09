import { getSettingsContent } from './get-settings-content';

/**
 * @description get all elements from settings UI
 */
export function getSettings (): any[] {
  const content = getSettingsContent ();
  const children = Array.from (content.children);

  // remove table header
  children.shift ();

  return children;
}
