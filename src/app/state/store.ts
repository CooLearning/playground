// import {DevicesStateNew} from './devices.state.new';
// import {NetworkStateNew} from './network.state.new';
// import {MappingsStateNew} from './mappings.state.new';
//
// export class Store {
//   public devices: DevicesStateNew;
//
//   public mappings: MappingsStateNew;
//
//   public network: NetworkStateNew;
//
//   private isReady: Promise<void>;
//
//   private constructor() {
//     this.isReady = new Promise((resolve) => {
//       (async () => {
//         this.devices = await DevicesStateNew.init();
//         this.mappings = new MappingsStateNew();
//         this.network = new NetworkStateNew();
//         resolve();
//       })();
//     });
//   }
//
//   public static async init(): Promise<Store> {
//     const store = new Store();
//     await store.isReady;
//     return store;
//   }
// }
