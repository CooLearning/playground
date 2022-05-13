// import {SnackbarComponent} from './components/snackbar.component';
//
// export class NotificationsView {
//   private isReady: Promise<void>;
//
//   private snackbar: HTMLDivElement;
//
//   private constructor() {
//     this.isReady = new Promise((resolve) => {
//       (async () => {
//         this.snackbar = SnackbarComponent();
//         document.body.appendChild(this.snackbar);
//         await this.waitForMaterialScripts();
//         resolve();
//       })();
//     });
//   }
//
//   public static async init(): Promise<NotificationsView> {
//     const instance = new NotificationsView();
//     await instance.isReady;
//     return instance;
//   }
//
//   public notify(
//     message: string,
//     timeout = 2000,
//     actionHandler: (e: Event) => void = () => undefined,
//     actionText: string = null,
//   ): void {
//     if (typeof message !== 'string') {
//       throw new Error('message is not a string');
//     }
//
//     const hasAction = actionHandler && actionText;
//
//     const options = {
//       message,
//       timeout,
//       actionHandler: hasAction ? actionHandler : undefined,
//       actionText: hasAction ? actionText : undefined,
//     };
//
//     this.snackbar.MaterialSnackbar.showSnackbar(options);
//   }
//
//   private waitForMaterialScripts() {
//     return new Promise((resolve) => {
//       const sender = this.snackbar?.MaterialSnackbar?.showSnackbar;
//       if (sender) {
//         resolve(sender);
//       }
//       else {
//         setTimeout(() => {
//           this.waitForMaterialScripts().then(resolve);
//         }, 100);
//       }
//     });
//   }
// }
