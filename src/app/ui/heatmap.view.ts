// import {Views} from './views';
// import {PlaygroundFacadeNew} from '../facades/playground.facade.new';
// import {Store} from '../state/store';
//
// export class HeatmapView {
//   private heatmap: HTMLDivElement;
//
//   private canvas: HTMLDivElement;
//
//   private views: Views;
//
//   private store: Store;
//
//   public constructor(views: Views, store: Store) {
//     this.views = views;
//     this.store = store;
//
//     this.heatmap = document.querySelector('#heatmap');
//     this.canvas = this.heatmap.children[0] as HTMLDivElement;
//
//     this.addStyle();
//     this.canvas.onclick = this.handleClick;
//   }
//
//   private handleClick() {
//     const id = parseInt(this.store.network.getOutputNode().id);
//
//     if (PlaygroundFacadeNew.selectedNodes.indexOf(id) === -1) {
//       this.views.network.toggleNodeSelection(id, true);
//     }
//     else {
//       this.views.network.toggleNodeSelection(id, false);
//     }
//   }
//
//   private addStyle() {
//     this.canvas.style.cursor = 'pointer';
//   }
// }
