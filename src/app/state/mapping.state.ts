import { renderSetting } from '../../coolearning/utils/render-setting';
import { notificationsUi } from '../ui/notifications.ui';

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

  this.setParameterMaps ({
    parameter,
    control,
    type,
  });

  this.disableLearningMode ();

  renderSetting ({
    parameter,
    control,
    type,
  });

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

  renderSetting ({ parameter });

  notificationsUi.notify (
    `${parameter} unlearned`,
  );

  // saveState ();
};

/**
 * Enable learning mode.
 *
 * @param {string} newLearningParameter - The parameter to learn.
 */
mappingState.enableLearningMode = function (newLearningParameter: string) {
  this.isLearning = true;
  this.learningParameter = newLearningParameter;
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
  if (this.controlByParameter[control] === undefined) {
    this.controlByParameter[control] = [parameter];
  } else {
    this.controlByParameter[control].push (parameter);
  }
};

/**
 * Unset the parameter and control maps.
 *
 * @param {string} parameter - The parameter to unset.
 */
mappingState.unsetParameterMaps = function (parameter: string) {
  // unmap
  delete this.controlByParameter[parameter];

  // reverse unmap
  const { control } = this.controlByParameter[parameter];
  const parameters = this.parametersByControl[control];

  if (parameters.length === 1) {
    delete this.parametersByControl[control];
  } else {
    const index = parameters.indexOf (parameter);
    if (index !== -1) {
      parameters.splice (index, 1);
    }
  }
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
