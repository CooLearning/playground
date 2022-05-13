// import {AbstractMode} from './abstract.mode';
// import {mappingsState} from '../../../state/mappings.state';
// import {mappingsUi} from '../../../ui/mappings.ui';
// import {playgroundUi} from '../../../ui/playground.ui';
// import {Controller} from '../controller';
//
// export class DefaultMode implements AbstractMode {
//   public color: number;
//
//   private controller: Controller;
//
//   constructor(controller: Controller) {
//     this.controller = controller;
//     this.color = this.controller.settings.colorByState.defaultMode;
//   }
//
//   public render(): void {
//     this.attachButtons();
//     this.attachFaders();
//   }
//
//   private attachButtons() {
//     this.controller.addNoteListener('on', (e) => {
//       const note = e.note.number;
//       const {isLearning, learningParameter} = mappingsState;
//
//       // learning a new mapping
//       if (isLearning && learningParameter) {
//         mappingsUi.learn({
//           parameter: learningParameter,
//           control: note,
//           type: 'button',
//         });
//       }
//       // update targets of already mapped parameters
//       else {
//         const mappedParameters = mappingsState.getParametersByControl(note);
//         mappedParameters.forEach((parameter) => {
//           playgroundUi.updateParameter(parameter, 1);
//         });
//       }
//
//       // draw feedback lights
//       this.controller.playNote({
//         note,
//         color: this.controller.settings.colorByState.feedback,
//         duration: this.controller.settings.time.defaultDuration,
//       });
//     });
//   }
//
//   private attachFaders() {
//     this.controller.addControlListener((e) => {
//       const note = e.controller.number;
//       const {isLearning, learningParameter} = mappingsState;
//       const parameters = mappingsState.getParametersByControl(note);
//
//       parameters.forEach((parameter) => {
//         playgroundUi.updateParameter(parameter, e.value);
//       });
//
//       if (isLearning && learningParameter) {
//         mappingsUi.learn({
//           parameter: learningParameter,
//           control: note,
//           type: 'range',
//         });
//       }
//
//       this.controller.playNote({
//         note: this.controller.settings.outputByInput[note],
//         duration: this.controller.settings.time.defaultDuration,
//         color: this.controller.settings.colorByState.feedback,
//       });
//     });
//   }
// }
