export enum SettingsPositions {
    Parameter = 0,
    Control = 1,
    Type = 2,
    Action = 3,
}

export enum SettingsActions {
    Learn = 'learn',
    Unlearn = 'unlearn',
}

export enum State {
    IsLearning = 'isLearning',
    LearningParameter = 'learningParameter',
    Devices = 'devices',
    ControlByParameter = 'controlByParameter',
    ParametersByControl = 'parametersByControl',
}

export enum StateActions {
    LearnControl = 'learn-control',
    UnlearnControl = 'unlearn-control',
    Reset = 'reset',
}

export enum MIDITypes {
    Range = 176,
    ButtonOn = 144,
    ButtonOff = 128,
    Aftertouch = 160,
}