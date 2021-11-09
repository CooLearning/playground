import { handleHighlightMode } from './handle-highlight-mode';

/**
 * @description initialize keyboard events
 */
export function initializeKeyboardEvents (): void {
  // enable ableton mode
  document.addEventListener ('keydown', (e) => {
    if (!(e.code === 'ShiftLeft')) {
      return;
    }
    handleHighlightMode (true);
  });

  // disable ableton mode
  document.addEventListener ('keyup', (e) => {
    if (!(e.code === 'ShiftLeft')) {
      return;
    }
    handleHighlightMode (false);
  });
}
