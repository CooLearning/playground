// enum Errors {
//   ContentNotDiv = 'The parent content node is not a `div`',
//   NewContentNotHTML = 'Please provide an HTML element to add',
// }
//
// export abstract class AbstractDialog {
//   protected node: HTMLDialogElement;
//
//   protected readonly content: HTMLDivElement;
//
//   private closeButton: HTMLButtonElement;
//
//   protected constructor(
//     nodeSelector: string,
//     contentSelector = '.mdl-dialog__content',
//     closeButtonSelector = '.close-button',
//   ) {
//     this.node = document.querySelector(nodeSelector);
//     this.content = this.node.querySelector(contentSelector);
//     this.closeButton = this.node.querySelector(closeButtonSelector);
//     this.attachEvents();
//   }
//
//   public show(): void {
//     this.node.showModal();
//   }
//
//   private attachEvents() {
//     // clicking close button
//     this.closeButton.addEventListener('click', () => {
//       this.hide();
//     });
//
//     // clicking outside container
//     this.node.addEventListener('click', (e) => {
//       // MDL adds `open` HTML attribute to the dialog container (outside) only
//       if (!e.target.open) {
//         return;
//       }
//       this.hide();
//     });
//   }
//
//   private hide() {
//     this.node.close();
//   }
//
//   private addContent(content: HTMLElement) {
//     if (!(content instanceof HTMLElement)) {
//       throw new Error(Errors.NewContentNotHTML);
//     }
//     if (!(this.content instanceof HTMLDivElement)) {
//       throw new Error(Errors.ContentNotDiv);
//     }
//   }
//
//   private purgeContent() {
//     if (!(this.content instanceof HTMLDivElement)) {
//       throw new Error(Errors.ContentNotDiv);
//     }
//
//     Array.from(this.content.children).forEach((child: HTMLElement) => {
//       this.content.removeChild(child);
//     });
//   }
// }
