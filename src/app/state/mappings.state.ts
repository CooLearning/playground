// import { store } from '../store/store';
//
// /**
//  * State object for the mappings.
//  */
// export const mappingsState = Object.create (null);
//
// mappingsState.isLearning = false;
// mappingsState.learningParameter = null;
// mappingsState.controlByParameter = {};
// mappingsState.parametersByControl = {};
//
// type LearnOptions = {
//   parameter: string;
//   control: number;
//   type: string;
// }
//
// /**
//  * Enable learning mode.
//  *
//  * @param {string} learningParameter - The parameter to learn.
//  */
// mappingsState.enableLearningMode = function (learningParameter: string) {
//   this.isLearning = true;
//   this.learningParameter = learningParameter;
// };
//
// /**
//  * Disable learning mode.
//  */
// mappingsState.disableLearningMode = function () {
//   this.isLearning = false;
//   this.learningParameter = null;
// };
//
// /**
//  * Set the parameter and control maps.
//  *
//  * @param {LearnOptions} options - The options for learning.
//  */
// mappingsState.setParameterMaps = function ({
//   parameter,
//   control,
//   type,
// }: LearnOptions) {
//   // map
//   this.controlByParameter[parameter] = {
//     control,
//     type,
//   };
//
//   // reverse map
//   if (this.parametersByControl[control] === undefined) {
//     this.parametersByControl[control] = [parameter];
//   }
//   else {
//     this.parametersByControl[control].push (parameter);
//   }
//
//   this.disableLearningMode ();
//   store.save ();
// };
//
// /**
//  * Unset the parameter and control maps.
//  *
//  * @param {string} parameter - The parameter to unset.
//  */
// mappingsState.unsetParameterMaps = function (parameter: string) {
//   // reverse unmap
//   const { control } = this.controlByParameter[parameter];
//   const parameters = this.getParametersByControl (control);
//
//   if (parameters.length === 1) {
//     delete this.parametersByControl[control];
//   }
//   else {
//     const index = parameters.indexOf (parameter);
//     if (index !== -1) {
//       parameters.splice (index, 1);
//     }
//   }
//
//   // unmap
//   delete this.controlByParameter[parameter];
// };
//
// /**
//  * Check if a parameter is mapped.
//  *
//  * @param {string} parameter - The parameter to check.
//  * @returns {boolean} - True if the parameter is mapped.
//  */
// mappingsState.isMapped = function (parameter: string): boolean {
//   return this.controlByParameter[parameter] !== undefined;
// };
//
// mappingsState.getParametersByControl = function (control: number) {
//   if (!this.parametersByControl[control]) {
//     return [];
//   }
//   return this.parametersByControl[control];
// };
