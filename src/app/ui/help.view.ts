// import {AbstractDialog} from './abstract.dialog';
//
// export class HelpView extends AbstractDialog {
//   private drawings: HTMLDivElement[];
//
//   public constructor() {
//     super('#help');
//     this.drawings = Array.from(this.content.children[0].children).slice(1) as HTMLDivElement[];
//     this.render();
//   }
//
//   private hideDrawing(drawing: HTMLDivElement) {
//     const image = drawing.querySelector('img');
//     image.style.display = 'none';
//   }
//
//   private hideOtherDrawings(currentDrawing) {
//     const otherImages = this.drawings.filter((d) => d !== currentDrawing);
//     otherImages.forEach((drawing) => this.hideDrawing(drawing));
//   }
//
//   private render() {
//     this.drawings.forEach((drawing) => {
//       const title = drawing.querySelector('h6');
//       const image = drawing.querySelector('img');
//
//       // init
//       this.hideDrawing(drawing);
//       image.onclick = () => this.hideDrawing(drawing);
//
//       // on title click
//       title.onclick = () => {
//         if (image.style.display === 'none') {
//           image.style.display = 'block';
//           image.scrollIntoView();
//           this.hideOtherDrawings(drawing);
//         }
//         else {
//           this.hideDrawing(drawing);
//         }
//       };
//     });
//   }
// }
