// import {Views} from './views';
//
// export class ButtonsView {
//   private views: Views;
//
//   private selectors = {
//     node: '#buttons',
//     importsExports: '.imports-exports',
//     devices: '.devices',
//     mappings: '.mappings',
//     help: '.help',
//     presets: '.presets',
//   };
//
//   private node: HTMLDivElement;
//
//   private importsExports: HTMLButtonElement;
//
//   private devices: HTMLButtonElement;
//
//   private mappings: HTMLButtonElement;
//
//   private help: HTMLButtonElement;
//
//   private presets: HTMLButtonElement;
//
//   public constructor(views: Views) {
//     this.views = views;
//     this.fetchElements();
//     this.setClickEvents();
//   }
//
//   private fetchElements() {
//     this.node = document.querySelector(this.selectors.node);
//     this.importsExports = this.node.querySelector(this.selectors.importsExports);
//     this.devices = this.node.querySelector(this.selectors.devices);
//     this.mappings = this.node.querySelector(this.selectors.mappings);
//     this.help = this.node.querySelector(this.selectors.help);
//     this.presets = this.node.querySelector(this.selectors.presets);
//   }
//
//   private setClickEvents() {
//     this.importsExports.onclick = () => this.views.importsExports.show();
//     this.mappings.onclick = () => this.views.mappings.show();
//     this.devices.onclick = () => this.views.devices.show();
//     this.help.onclick = () => this.views.help.show();
//     this.presets.onclick = () => this.views.presets.show();
//   }
// }
