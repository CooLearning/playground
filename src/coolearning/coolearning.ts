import './interfaces';
import { initializeKeyboardEvents } from './utils/initialize-keyboard-events';
import { app } from '../app/app';
import { notificationsUi } from '../app/ui/notifications.ui';

/**
 * @description entry point for CooLearning playground extension
 */
export function Coolearning (): void {
  window.addEventListener ('load', () => {
    try {
      app.init ();
      initializeKeyboardEvents ();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error (error);
      notificationsUi.notify (
        error.toString (),
        5000,
      );
    }
  });
}
