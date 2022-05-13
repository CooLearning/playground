// import {AbstractDialog} from './abstract.dialog';
// import {store} from '../store/store';
//
// interface Buttons {
//   import: HTMLButtonElement;
//   export: HTMLButtonElement;
//   reset: HTMLButtonElement;
// }
//
// export class ImportsExportsView extends AbstractDialog {
//   private nodeSelectors = {
//     textarea: '.imports-exports-import__textarea',
//     button: {
//       import: '#imports-exports-import__button',
//       export: '#imports-exports-export__button',
//       reset: '#imports-exports-reset__button',
//     },
//   };
//
//   private isInitialized = false;
//
//   private textarea: HTMLTextAreaElement;
//
//   private button: Buttons = {
//     import: undefined,
//     export: undefined,
//     reset: undefined,
//   };
//
//   public constructor() {
//     super('#imports-exports-dialog');
//     this.textarea = this.node.querySelector(this.nodeSelectors.textarea);
//
//     this.button.import = this.node.querySelector(this.nodeSelectors.button.import);
//     this.button.export = this.node.querySelector(this.nodeSelectors.button.export);
//     this.button.reset = this.node.querySelector(this.nodeSelectors.button.reset);
//
//     this.isInitialized = true;
//
//     this.attachButtons();
//   }
//
//   public show(): void {
//     this.textarea.value = JSON.stringify(store.state, undefined, 2);
//     super.show();
//   }
//
//   private attachButtons() {
//     this.attachImport();
//     this.attachExport();
//     this.attachReset();
//   }
//
//   private attachExport() {
//     this.button.export.onclick = () => {
//       const string = JSON.stringify(store.state, undefined, 2);
//       const anchor = document.createElement('a');
//       document.body.appendChild(anchor);
//       anchor.style.display = 'none';
//       const dataPrefix = 'data:text/json;charset=utf-8,';
//       anchor.href = `${dataPrefix}${encodeURIComponent(string)}`;
//       anchor.download = 'coolearning-config.json';
//       anchor.click();
//       document.body.removeChild(anchor);
//     };
//   }
//
//   private attachImport() {
//     this.button.import.onclick = () => {
//       try {
//         const json = JSON.parse(this.textarea.value);
//         store.import(json);
//         this.textarea.value = 'Done';
//       }
//       catch (error) {
//         this.textarea.value = null;
//         throw new Error('Error while import data: ' + error);
//       }
//     };
//   }
//
//   private attachReset() {
//     this.button.reset.onclick = () => {
//       store.reset();
//     };
//   }
// }
