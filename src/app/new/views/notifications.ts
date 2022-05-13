interface NotifyOptions {
  message: string;
  timeout?: number;
  actionHandler?: (e: Event) => void;
  actionText?: string;
}

export class Notifications {
  private isReady: Promise<void>;

  private snackbar: HTMLDivElement;

  private constructor() {
    this.isReady = new Promise((resolve) => {
      (async () => {
        this.loadMaterialScript();
        this.snackbar = Notifications.createSnackbar();
        document.body.appendChild(this.snackbar);
        await this.waitForSnackbar();
        resolve();
      })();
    });
  }

  public static async create(): Promise<Notifications> {
    const notifications = new Notifications();
    await notifications.isReady;
    return notifications;
  }

  private static createSnackbar() {
    const snackbar = document.createElement('div');
    snackbar.classList.add('mdl-js-snackbar');
    snackbar.classList.add('mdl-snackbar');

    const message = document.createElement('div');
    message.classList.add('mdl-snackbar__text');
    snackbar.appendChild(message);

    const action = document.createElement('button');
    action.classList.add('mdl-snackbar__action');
    action.type = 'button';
    snackbar.appendChild(action);

    return snackbar;
  }

  public notify(options: NotifyOptions): void {
    const hasAction = options.actionHandler && options.actionText;

    const o = {
      message: options.message,
      timeout: options.timeout || 2000,
      actionHandler: hasAction ? options.actionHandler : undefined,
      actionText: hasAction ? options.actionText : undefined,
    };

    this.snackbar.MaterialSnackbar.showSnackbar(o);
  }

  // todo: make it local resource
  private loadMaterialScript() {
    const script = document.createElement('script');
    script.src = 'https://code.getmdl.io/1.3.0/material.min.js';

    script.onload = () => {
      window.componentHandler.upgradeAllRegistered();
    };

    document.head.appendChild(script);
  }

  private waitForSnackbar(): Promise<void> {
    return new Promise((resolve) => {
      const sender = this.snackbar?.MaterialSnackbar?.showSnackbar;

      if (sender) {
        resolve();
      }
      else {
        setTimeout(() => {
          this.waitForSnackbar().then(resolve);
        }, 100);
      }
    });
  }
}
