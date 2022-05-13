// import {store} from '../store/store';
//
// interface LearnOptions {
//   parameter: string;
//   control: number;
//   type: string;
// }
//
// export class MappingsStateNew {
//   public controlByParameter = {};
//
//   public parametersByControl = {};
//
//   private isLearning = false;
//
//   private learningParameter = null;
//
//   public disableLearningMode() {
//     this.isLearning = false;
//     this.learningParameter = null;
//   }
//
//   public isMapped(parameter: string) {
//     return this.controlByParameter[parameter] !== undefined;
//   }
//
//   public setParameterMaps({
//     parameter,
//     control,
//     type,
//   }: LearnOptions) {
//     // map
//     this.controlByParameter[parameter] = {
//       control,
//       type,
//     };
//
//     // reverse map
//     if (this.parametersByControl[control] === undefined) {
//       this.parametersByControl[control] = [parameter];
//     }
//     else {
//       this.parametersByControl[control].push(parameter);
//     }
//
//     this.disableLearningMode();
//     store.save();
//   }
//
//   public unsetParameterMaps(parameter: string) {
//     // reverse unmap
//     const {control} = this.controlByParameter[parameter];
//     const parameters = this.getParametersByControl(control);
//
//     if (parameters.length === 1) {
//       delete this.parametersByControl[control];
//     }
//     else {
//       const index = parameters.indexOf(parameter);
//       if (index !== -1) {
//         parameters.splice(index, 1);
//       }
//     }
//
//     // unmap
//     delete this.controlByParameter[parameter];
//   }
//
//   private enableLearningMode(learningParameter: string) {
//     this.isLearning = true;
//     this.learningParameter = learningParameter;
//   }
//
//   private getParametersByControl(control: number) {
//     if (!this.parametersByControl[control]) {
//       return [];
//     }
//     return this.parametersByControl[control];
//   }
// }
