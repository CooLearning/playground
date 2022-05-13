/**
 * Returns true if the current host is localhost.
 *
 * @returns {boolean} Is localhost?
 */
export function isLocalhost(): boolean {
  return window.location.href.includes('localhost');
}
