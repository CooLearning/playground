// import { dialogPrototype } from './prototypes/dialog.prototype';
//
// export const helpUi = Object.create (dialogPrototype);
//
// helpUi.nodeSelectors = {
//   node: '#help',
//   closeButton: '.close-button',
//   content: '.mdl-dialog__content',
// };
//
// helpUi.init = function () {
//   this.node = document.querySelector (this.nodeSelectors.node);
//   this.closeButton = this.node.querySelector (this.nodeSelectors.closeButton);
//   this.content = this.node.querySelector (this.nodeSelectors.content);
//   this.drawings = Array.from (this.content.children[0].children).slice (1);
//
//   this.attachEvents (this.closeButton);
//   this.renderDrawings ();
// };
//
// helpUi.hideDrawing = function (drawing) {
//   const image = drawing.querySelector ('img');
//   image.style.display = 'none';
// };
//
// helpUi.hideOtherDrawings = function (currentDrawing) {
//   const otherImages = this.drawings.filter ((d) => d !== currentDrawing);
//   otherImages.forEach ((drawing) => this.hideDrawing (drawing));
// };
//
// helpUi.renderDrawings = function () {
//   this.drawings.forEach ((drawing) => {
//     const title = drawing.querySelector ('h6');
//     const image = drawing.querySelector ('img');
//
//     // init
//     this.hideDrawing (drawing);
//     image.onclick = () => this.hideDrawing (drawing);
//
//     // on title click
//     title.onclick = () => {
//       if (image.style.display === 'none') {
//         image.style.display = 'block';
//         image.scrollIntoView ();
//         this.hideOtherDrawings (drawing);
//       } else {
//         this.hideDrawing (drawing);
//       }
//     };
//   });
// };
