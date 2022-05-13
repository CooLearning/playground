// import { dialogPrototype } from './prototypes/dialog.prototype';
// import { store } from '../store/store';
//
// export const importsExportsUi = Object.create (dialogPrototype);
//
// importsExportsUi.isInitialized = false;
//
// importsExportsUi.nodeSelectors = {
//   node: '#imports-exports-dialog',
//   closeButton: '.close-button',
//   contentNode: '.mdl-dialog__content',
//   textarea: '.imports-exports-import__textarea',
//   button: {
//     import: '#imports-exports-import__button',
//     export: '#imports-exports-export__button',
//     reset: '#imports-exports-reset__button',
//   },
// };
//
// importsExportsUi.init = function () {
//   this.node = document.querySelector (this.nodeSelectors.node);
//   this.content = this.node.querySelector (this.nodeSelectors.contentNode);
//   this.closeButton = this.node.querySelector (this.nodeSelectors.closeButton);
//
//   this.textarea = this.node.querySelector (this.nodeSelectors.textarea);
//
//   this.button = {};
//   this.button.import = this.node.querySelector (this.nodeSelectors.button.import);
//   this.button.export = this.node.querySelector (this.nodeSelectors.button.export);
//   this.button.reset = this.node.querySelector (this.nodeSelectors.button.reset);
//
//   this.isInitialized = true;
//
//   this.attachEvents (this.closeButton);
//   this.attachButtons ();
// };
//
// importsExportsUi.attachButtons = function () {
//   this.attachImport ();
//   this.attachExport ();
//   this.attachReset ();
// };
//
// importsExportsUi.attachImport = function () {
//   this.button.import.onclick = () => {
//     try {
//       const json = JSON.parse (this.textarea.value);
//       store.import (json);
//       this.textarea.value = 'Done';
//     }
//     catch (error) {
//       this.textarea.value = null;
//       throw new Error ('Error while import data: ' + error);
//     }
//   };
// };
//
// importsExportsUi.attachExport = function () {
//   this.button.export.onclick = () => {
//     const string = JSON.stringify (store.state, undefined, 2);
//     const anchor = document.createElement ('a');
//     document.body.appendChild (anchor);
//     anchor.style.display = 'none';
//     const dataPrefix = 'data:text/json;charset=utf-8,';
//     anchor.href = `${dataPrefix}${encodeURIComponent (string)}`;
//     anchor.download = 'coolearning-config.json';
//     anchor.click ();
//     document.body.removeChild (anchor);
//   };
// };
//
// importsExportsUi.attachReset = function () {
//   this.button.reset.onclick = () => {
//     store.reset ();
//   };
// };
//
// importsExportsUi.show = function () {
//   this.textarea.value = JSON.stringify (store.state, undefined, 2);
//   this.node.showModal ();
// };
