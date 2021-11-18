import { devicesUi } from './devices.ui';
import { mappingsUi } from './mappings.ui';
import { helpUi } from './help.ui';
import { importsExportsUi } from './imports-exports.ui';
import { ui } from './ui';

export const buttonsUi = Object.create (null);

buttonsUi.nodeSelectors = {
  node: '#buttons',
  importsExports: '.imports-exports',
  devices: '.devices',
  mappings: '.mappings',
  help: '.help',
  presets: '.presets',
};

buttonsUi.init = function () {
  this.node = document.querySelector (this.nodeSelectors.node);
  this.importsExports = this.node.querySelector (this.nodeSelectors.importsExports);
  this.devices = this.node.querySelector (this.nodeSelectors.devices);
  this.mappings = this.node.querySelector (this.nodeSelectors.mappings);
  this.help = this.node.querySelector (this.nodeSelectors.help);
  this.presets = this.node.querySelector (this.nodeSelectors.presets);

  this.importsExports.onclick = () => importsExportsUi.show ();
  this.mappings.onclick = () => mappingsUi.show ();
  this.devices.onclick = () => devicesUi.show ();
  this.help.onclick = () => helpUi.show ();
  this.presets.onclick = () => ui.presetsView.show ();
};
