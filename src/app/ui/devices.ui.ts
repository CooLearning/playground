import { dialogPrototype } from './prototypes/dialog.prototype';
import { devicesState } from '../state/devices.state';
import { Device } from '../devices/device/device.types';

export const devicesUi = Object.create (dialogPrototype);

devicesUi.isInitialized = false;

devicesUi.nodeSelectors = {
  node: '#devices',
  closeButton: '.close-button',
  contentNode: '.mdl-dialog__content',
  noSelector: '.no-selector',
  noController: '.no-controller',
  selectorOptions: '[title=selectors-options]',
  controllerOptions: '[title=controllers-options]',
};

devicesUi.init = function () {
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

type ShouldRender = {
  selectors: boolean;
  controllers: boolean;
}

devicesUi.shouldRender = function (): ShouldRender {
  const { selectors, controllers } = devicesState;

  if (!selectors && !controllers) {
    return {
      selectors: false,
      controllers: false,
    };
  }
  else {
    return {
      selectors: Object.keys (selectors).length !== 0,
      controllers: Object.keys (controllers).length !== 0,
    };
  }
};

devicesUi.render = function () {
  if (!this.isInitialized) {
    return;
  }
  
  const shouldRender = this.shouldRender ();

  // selectors
  this.noSelector.style.display = shouldRender.selectors ? 'none' : null;
  this.selectorOptions.style.display = shouldRender.selectors ? null : 'none';
  this.renderOptions ('selector');

  // controllers
  this.noController.style.display = shouldRender.controllers ? 'none' : null;
  this.controllerOptions.style.display = shouldRender.controllers ? null : 'none';
  this.renderOptions ('controller');
};

devicesUi.renderOptions = function (target: string) {
  let targetNode;
  let options;
  let pickedDevice: Device;
  if (target === 'selector') {
    targetNode = this.selectorOptions;
    options = devicesState.selectors;
    pickedDevice = devicesState.pickedSelector;
  }
  else if (target === 'controller') {
    targetNode = this.controllerOptions;
    options = devicesState.controllers;
    pickedDevice = devicesState.pickedController;
  }
  else {
    throw new Error ('target node is undefined while render options');
  }

  // purge existing options
  Array.from (targetNode).forEach ((option: HTMLElement) => {
    targetNode.removeChild (option);
  });

  // add options
  if (options) {
    // default 'none' option
    const none = document.createElement ('option');
    none.innerText = 'Select port';
    none.disabled = true;
    none.selected = pickedDevice === null;
    targetNode.appendChild (none);

    // add passed options
    Object.keys (options).forEach ((optionName) => {
      const option = document.createElement ('option');
      option.value = optionName;
      option.innerText = optionName;
      option.selected = optionName === pickedDevice?.name;
      targetNode.appendChild (option);
    });
  }

  // add events
  if (target === 'selector') {
    targetNode.onchange = (e) => devicesState.pickSelector (e.target.value);
  }
  else if (target === 'controller') {
    targetNode.onchange = (e) => devicesState.pickController (e.target.value);
  }
};
