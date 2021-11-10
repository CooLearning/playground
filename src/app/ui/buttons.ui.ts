import { devicesUi } from './devices.ui';
import { mappingsUi } from './mappings.ui';

export const buttonsUi = Object.create (null);

buttonsUi.nodeSelectors = {
  node: '#buttons',
  settings: '.settings',
  devices: '.devices',
  mappings: '.mappings',
  reset: '.reset',
};

buttonsUi.init = function () {
  this.node = document.querySelector (this.nodeSelectors.node);
  this.settings = this.node.querySelector (this.nodeSelectors.settings);
  this.devices = this.node.querySelector (this.nodeSelectors.devices);
  this.mappings = this.node.querySelector (this.nodeSelectors.mappings);
  this.reset = this.node.querySelector (this.nodeSelectors.reset);

  // eslint-disable-next-line no-console
  this.settings.onclick = () => console.log ('settings');
  this.devices.onclick = () => mappingsUi.show ();
  this.mappings.onclick = () => devicesUi.show ();
  // eslint-disable-next-line no-console
  this.reset.onclick = () => console.log ('reset');
};
