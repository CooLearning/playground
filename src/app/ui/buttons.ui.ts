import { devicesUi } from './devices.ui';
import { mappingsUi } from './mappings.ui';
import { helpUi } from './help.ui';
import { store } from '../store/store';
import { importsExportsUi } from './imports-exports.ui';

export const buttonsUi = Object.create (null);

buttonsUi.nodeSelectors = {
  node: '#buttons',
  importsExports: '.imports-exports',
  devices: '.devices',
  mappings: '.mappings',
  reset: '.reset',
  help: '.help',
};

buttonsUi.init = function () {
  this.node = document.querySelector (this.nodeSelectors.node);
  this.importsExports = this.node.querySelector (this.nodeSelectors.importsExports);
  this.devices = this.node.querySelector (this.nodeSelectors.devices);
  this.mappings = this.node.querySelector (this.nodeSelectors.mappings);
  this.reset = this.node.querySelector (this.nodeSelectors.reset);
  this.help = this.node.querySelector (this.nodeSelectors.help);

  this.importsExports.onclick = () => importsExportsUi.show ();
  this.mappings.onclick = () => mappingsUi.show ();
  this.devices.onclick = () => devicesUi.show ();
  this.help.onclick = () => helpUi.show ();
  this.reset.onclick = () => store.reset ();
};
