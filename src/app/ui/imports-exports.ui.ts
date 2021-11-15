import { dialogPrototype } from './prototypes/dialog.prototype';

export const importsExportsUi = Object.create (dialogPrototype);

importsExportsUi.isInitialized = false;

importsExportsUi.nodeSelectors = {
  node: '#imports-exports-dialog',
  closeButton: '.close-button',
  contentNode: '.mdl-dialog__content',
  noSelector: '.no-selector',
  noController: '.no-controller',
  selectorOptions: '[title=selectors-options]',
  controllerOptions: '[title=controllers-options]',
};

importsExportsUi.init = function () {
  this.node = document.querySelector (this.nodeSelectors.node);
  this.content = this.node.querySelector (this.nodeSelectors.contentNode);
  this.closeButton = this.node.querySelector (this.nodeSelectors.closeButton);

  this.noSelector = this.node.querySelector (this.nodeSelectors.noSelector);
  this.noController = this.node.querySelector (this.nodeSelectors.noController);

  this.selectorOptions = this.node.querySelector (this.nodeSelectors.selectorOptions);
  this.controllerOptions = this.node.querySelector (this.nodeSelectors.controllerOptions);

  this.isInitialized = true;

  this.attachEvents (this.closeButton);
  this.render ();
};

importsExportsUi.render = function () {
  console.log (this);
};
