// import {HeatmapView} from './heatmap.view';
// import {PresetsView} from './presets.view';
// import {NotificationsView} from './notifications.view';
// import {MappingsView} from './mappings.view';
// import {ButtonsView} from './buttons.view';
// import {SelectCardView} from './select-card.view';
// import {DevicesView} from './devices.view';
// import {HelpView} from './help.view';
// import {ImportsExportsView} from './imports-exports.view';
// import {PlaygroundView} from './playground.view';
// import {LayerCardView} from './layer-card.view';
// import {NetworkView} from './network.view';
// import {Store} from '../state/store';
// import {Devices} from '../devices/devices';
//
// export class Views {
//   public layerCard: LayerCardView;
//
//   public notifications: NotificationsView;
//
//   public selectCard: SelectCardView;
//
//   public network: NetworkView;
//
//   public mappings: MappingsView;
//
//   public importsExports: ImportsExportsView;
//
//   public devices: DevicesView;
//
//   public help: HelpView;
//
//   public presets: PresetsView;
//
//   public playground: PlaygroundView;
//
//   private buttons: ButtonsView;
//
//   private heatmap: HeatmapView;
//
//   private store: Store;
//
//   private isReady: Promise<void>;
//
//   private constructor(store: Store, devices: Devices) {
//     this.isReady = new Promise((resolve) => {
//       (async () => {
//         this.store = store;
//         this.devices = devices;
//
//         this.addMaterialScript();
//         this.notifications = await NotificationsView.init();
//
//         this.mappings = new MappingsView(this.store);
//         this.buttons = new ButtonsView(this);
//         this.devices = new DevicesView(this.store);
//         this.help = new HelpView();
//         this.importsExports = new ImportsExportsView();
//
//         this.heatmap = new HeatmapView(this);
//         this.presets = new PresetsView();
//         this.network = new NetworkView(this);
//
//         this.selectCard = new SelectCardView(this.store);
//         this.layerCard = new LayerCardView(this.store);
//
//         resolve();
//       })();
//     });
//   }
//
//   public static async init(store: Store, devices: Devices): Promise<Views> {
//     const instance = new Views(store, devices);
//     await instance.isReady;
//     return instance;
//   }
//
//   public initFromPlayground(): void {
//     this.playground = new PlaygroundView(this, this.store, this.devices);
//   }
//
//   // todo: make it local resource
//   private addMaterialScript() {
//     const script = document.createElement('script');
//     script.src = 'https://code.getmdl.io/1.3.0/material.min.js';
//
//     script.onload = () => {
//       window.componentHandler.upgradeAllRegistered();
//     };
//
//     document.head.appendChild(script);
//   }
// }
