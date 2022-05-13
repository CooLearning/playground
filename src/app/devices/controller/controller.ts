// import {networkState} from '../../state/network.state';
// import {LayerMode} from './modes/layer.mode';
// import {AbstractMode} from './modes/abstract.mode';
// import {DefaultMode} from './modes/default.mode';
// import {SelectMode} from './modes/select.mode';
// import {AbstractDevice} from '../device/abstract.device';
// import {ControllerInterface, DeviceInterface} from '../device/device.types';
// import {PlaygroundFacadeNew} from '../../facades/playground.facade.new';
//
// export class Controller extends AbstractDevice {
//   public settings: ControllerInterface;
//
//   public shifted = {
//     0: false,
//     1: false,
//     2: false,
//     3: false,
//     4: false,
//     5: false,
//     6: false,
//     7: false,
//   };
//
//   private mode: AbstractMode;
//
//   private isReady: Promise<void>;
//
//   private constructor(device: DeviceInterface) {
//     super();
//     this.isReady = new Promise((resolve) => {
//       (async () => {
//         if (this.isInitialized) {
//           this.removeListeners();
//         }
//
//         this.isInitialized = false;
//
//         this.device = device;
//         this.settings = device.settings as ControllerInterface;
//
//         await this.runBootSequence();
//         this.render();
//
//         this.isInitialized = true;
//
//         resolve();
//       })();
//     });
//   }
//
//   private static get isDefaultMode() {
//     return PlaygroundFacadeNew.selectedNodes.length === 0;
//   }
//
//   private static get isLayerMode() {
//     return networkState.selectedLayerIndex !== null;
//   }
//
//   private static get isMultipleMode() {
//     return PlaygroundFacadeNew.selectedNodes.length > 1;
//   }
//
//   private static get isSingleMode() {
//     return PlaygroundFacadeNew.selectedNodes.length === 1;
//   }
//
//   private static get isSelectMode() {
//     return PlaygroundFacadeNew.selectedNodes.length > 0;
//   }
//
//   public static async init(): Promise<Controller> {
//     const controller = new Controller();
//     await controller.isReady;
//     return controller;
//   }
//
//   public async init(device: DeviceInterface): Promise<Controller> {
//     const controller = new Controller(device);
//     await controller.isReady;
//     return controller;
//   }
//
//   public render(): void {
//     if (this.isInitialized === false) {
//       return;
//     }
//
//     this.updateMode();
//
//     if (typeof this.mode === undefined) {
//       return;
//     }
//
//     this.removeListeners();
//     this.lightAllNotes();
//     this.mode.render();
//   }
//
//   public onSelectionEvent(): void {
//     if (!this.isInitialized) {
//       return;
//     }
//
//     setTimeout(() => {
//       this.updateMode();
//     }, this.settings.time.wait);
//   }
//
//   public updateMode(): void {
//     if (Controller.isLayerMode) {
//       this.mode = new LayerMode(this);
//     }
//     else if (Controller.isDefaultMode) {
//       this.mode = new DefaultMode(this);
//     }
//     else if (Controller.isSelectMode) {
//       this.mode = new SelectMode(this);
//     }
//   }
//
//   private lightAllNotes() {
//     this.playNotes({
//       firstNote: this.settings.lights.first,
//       lastNote: this.settings.lights.last,
//       color: this.mode.color,
//     });
//   }
// }
