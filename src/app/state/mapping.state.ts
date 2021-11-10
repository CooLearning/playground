import { notificationsUi } from '../ui/notifications.ui';
import { modalUi } from '../ui/modal.ui';

/**
 * State object for the mappings.
 */
export const mappingState = Object.create (null);

mappingState.isLearning = false;
mappingState.learningParameter = null;
mappingState.controlByParameter = {};
mappingState.parametersByControl = {};

mappingState.state = {
  get state () {
    return {
      isLearning: this.isLearning,
      learningParameter: this.learningParameter,
      controlByParameter: this.controlByParameter,
      parametersByControl: this.parametersByControl,
    };
  },
};

type LearnOptions = {
  parameter: string;
  control: number;
  type: string;
}

/**
 * Learn a mapping between a parameter and a control.
 *
 * @param {LearnOptions} options - The options for learning.
 */
mappingState.learn = function ({
  parameter,
  control,
  type,
}: LearnOptions) {
  if (this.isMapped (parameter)) {
    return;
  }

  this.setParameterMaps ({ parameter, control, type });
  this.disableLearningMode ();
  modalUi.updateMapping (parameter, control, type);
  notificationsUi.notify (
    `Learn: control ${control} for ${parameter} (${type})`,
  );
};

/**
 * Unlearn a mapping between a parameter and a control.
 *
 * @param {string} parameter - The parameter to unlearn.
 */
mappingState.unlearn = function (parameter: string) {
  if (!this.isMapped (parameter)) {
    return;
  }
  this.unsetParameterMaps (parameter);
  modalUi.updateMapping (parameter);
  notificationsUi.notify (`${parameter} unlearned`);

  // saveState ();
};

/**
 * Enable learning mode.
 *
 * @param {string} learningParameter - The parameter to learn.
 */
mappingState.enableLearningMode = function (learningParameter: string) {
  this.isLearning = true;
  this.learningParameter = learningParameter;
};

/**
 * Disable learning mode.
 */
mappingState.disableLearningMode = function () {
  this.isLearning = false;
  this.learningParameter = null;
};

/**
 * Set the parameter and control maps.
 *
 * @param {LearnOptions} options - The options for learning.
 */
mappingState.setParameterMaps = function ({
  parameter,
  control,
  type,
}: LearnOptions) {
  // map
  this.controlByParameter[parameter] = {
    control,
    type,
  };

  // reverse map
  if (this.parametersByControl[control] === undefined) {
    this.parametersByControl[control] = [parameter];
  } else {
    this.parametersByControl[control].push (parameter);
  }
};

/**
 * Unset the parameter and control maps.
 *
 * @param {string} parameter - The parameter to unset.
 */
mappingState.unsetParameterMaps = function (parameter: string) {
  // reverse unmap
  const { control } = this.controlByParameter[parameter];
  const parameters = this.getParametersByControl (control);

  if (parameters.length === 1) {
    delete this.parametersByControl[control];
  } else {
    const index = parameters.indexOf (parameter);
    if (index !== -1) {
      parameters.splice (index, 1);
    }
  }

  // unmap
  delete this.controlByParameter[parameter];
};

/**
 * Check if a parameter is mapped.
 *
 * @param {string} parameter - The parameter to check.
 * @returns {boolean} - True if the parameter is mapped.
 */
mappingState.isMapped = function (parameter: string): boolean {
  return this.controlByParameter[parameter] !== undefined;
};

mappingState.getParametersByControl = function (control: number) {
  if (!this.parametersByControl[control]) {
    return [];
  }
  return this.parametersByControl[control];
};
