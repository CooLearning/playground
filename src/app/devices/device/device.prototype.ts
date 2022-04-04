import {InputEventNoteoff, InputEventNoteon} from 'webmidi';
import {Device, DeviceSettings} from './device.types';

export const devicePrototype = Object.create(null);

devicePrototype.isInitialized = false as boolean;
devicePrototype.device = null as Device;
devicePrototype.settings = null as DeviceSettings;
devicePrototype.network = null as any;
devicePrototype.blinkingNotes = {};

devicePrototype.reset = function() {
  this.removeListeners();
  this.isInitialized = false as boolean;
  this.device = null as Device;
  this.settings = null as DeviceSettings;
  this.network = null as any;
  this.blinkingNotes = {};
};

/**
 * Run the boot sequence
 */
devicePrototype.runBootSequence = async function(): Promise<void> {
  return new Promise((resolve) => {
    this.removeListeners();

    const {color, sysex} = this.settings.bootSequence;
    if (sysex) {
      const {manufacturer, data} = sysex;
      if (typeof manufacturer !== 'undefined' && typeof data !== 'undefined') {
        this.device.output.sendSysex(manufacturer, data);
      }
    }

    // flash the lights
    this.playNotes({
      firstNote: this.settings.lights.first,
      lastNote: this.settings.lights.last,
      color,
      duration: this.settings.time.defaultDuration,
    });

    // resolve
    setTimeout(() => {
      resolve();
    },
    this.settings.time.defaultDuration
      + this.settings.time.wait,
    );
  });
};

type PlayNoteOptions = {
  note: number;
  color: number;
  duration?: number;
}

/**
 * Utility function to play a note
 *
 * @param {PlayNoteOptions} options - The options
 * @param {number} options.note - The note to play
 * @param {number} options.color - The color of the note (velocity)
 * @param {number} [options.duration] - The duration of the note
 */
devicePrototype.playNote = function(
  {
    note,
    color,
    duration = 3600000,
  }: PlayNoteOptions,
): void {
  this.device.output.playNote(note, this.settings.channels.output, {
    duration,
    rawVelocity: true,
    velocity: color,
  });
};

type PlayNotesOptions = {
  firstNote: number;
  lastNote: number;
  color: number;
  duration?: number;
}

/**
 * Utility function to play multiple notes
 *
 * @param {PlayNotesOptions} options - The options
 * @param {number} options.firstNote - The first note to play
 * @param {number} options.lastNote - The last note to play
 * @param {number} options.color - The color of the note (velocity)
 * @param {number} options.duration - The duration of the note
 */
devicePrototype.playNotes = function(
  {
    firstNote,
    lastNote,
    color,
    duration = 3600000,
  }: PlayNotesOptions,
): void {
  for (let i = firstNote; i <= lastNote; ++i) {
    this.playNote({
      note: i,
      duration,
      color,
    });
  }
};

/**
 * Utility function to clear a given blinking note
 *
 * @param {number} note - The blinking note to clear
 */
devicePrototype.clearBlinkingNote = function(note): void {
  if (typeof this.blinkingNotes?.[note] === 'number') {
    clearTimeout(this.blinkingNotes[note]);
    this.blinkingNotes[note] = null;
  }
};

type BlinkNoteOptions = {
  note: number;
  color: number;
  interval: number;
}

/**
 * Utility function to blink a given note
 *
 * @param {BlinkNoteOptions} options - The options
 * @param {number} options.note - The note to blink
 * @param {number} options.color - The color of the note (velocity)
 * @param {number} [options.interval=400] - The blinking interval
 */
devicePrototype.blinkNote = function({
  note,
  color,
  interval = 400,
}: BlinkNoteOptions): void {
  this.clearBlinkingNote(note);
  this.blinkingNotes[note] = setInterval(() => {
    this.playNote({
      note,
      color,
      duration: interval / 2,
    });
  }, interval);
};

type PlayOrBlinkNoteOptions = {
  note: number;
  color: number;
  interval: number;
  duration: number;
}

/**
 * Utility function to play or blink a given note
 *
 * @param {PlayOrBlinkNoteOptions} options - The options
 * @param {number} options.note - The note to play or blink
 * @param {number} options.color - The color of the note (velocity)
 * @param {number} options.interval - The blinking interval
 * @param {number} options.duration - The duration of the note
 */
devicePrototype.playOrBlinkNote = function({
  note,
  color,
  interval = 400,
  duration = 3600000,
}: PlayOrBlinkNoteOptions): void {
  if (typeof this.blinkingNotes?.[note] === 'undefined') {
    // first time
    this.blinkingNotes[note] = null;
    this.playNote({
      note,
      color,
      duration,
    });
  }
  else if (this.blinkingNotes?.[note] === null) {
    // not blinking
    this.blinkNote({
      note,
      color,
      interval,
    });
  }
  else {
    // already blinking
    this.clearBlinkingNote(note);
    setTimeout(() => {
      this.playNote({
        note,
        color,
        duration,
      });
    }, interval / 2); // wait for the blink to finish;
  }
};

/**
 * Clear listeners.
 */
devicePrototype.removeListeners = function(): void {
  this.device.input.removeListener();
};

/**
 * Utility function to attach an input event to the device
 *
 * @param {string} noteState - The state of the note to listen to
 * @param {Function} listener - The listener function
 */
devicePrototype.addNoteListener = function(
  noteState = 'on',
  listener: (e: InputEventNoteon | InputEventNoteoff) => any,
): void {
  if (noteState !== 'on' && noteState !== 'off') {
    throw new Error('note should be either "on" or "off"');
  }

  this.device.input.addListener(
    `note${noteState}`,
    this.settings.channels.input,
    (e) => listener(e),
  );
};

interface AddNoteListenerNewOptions {
  note: number;
  color: number;
  callback: (e: InputEventNoteon | InputEventNoteoff) => void;
}

devicePrototype.addNoteListener_NEW = function({
  note,
  color = undefined,
  callback,
}: AddNoteListenerNewOptions): void {
  const message = 'noteon';
  const channel = this.settings.channels.input;

  if (color) {
    this.playNote({note, color});
  }

  const filterThenInvokeCallback = (e: InputEventNoteon | InputEventNoteoff) => {
    if (note !== e.note.number) {
      return;
    }

    callback(e);
  };

  this.device.input.addListener(message, channel, filterThenInvokeCallback);
};

/**
 * Utility function to remove an input event from the device
 *
 * @param {string} noteState - The state of the note to remove the listener from
 */
devicePrototype.removeNoteListeners = function(noteState: string): void {
  if (noteState !== 'on' && noteState !== 'off') {
    throw new Error('note should be either "on" or "off"');
  }

  this.device.input.removeListener(`note${noteState}`);
};

/**
 * Utility function to attach an input event to the device
 *
 * @param {*} listener - The listener function
 * @param {boolean} isToggle - Set true to simulate button toggle
 */
devicePrototype.addControlListener = function(listener, isToggle = false): void {
  this.device.input.addListener(
    'controlchange',
    this.settings.channels.input,
    (e) => {
      if (isToggle && e.value !== 127) {
        return;
      }
      listener(e);
    },
  );
};

interface AddControlListenerNewOptions {
  note: number;
  callback;
  isToggle: boolean;
}

devicePrototype.addControlListener_NEW = function({
  note,
  callback,
  isToggle = false,
}: AddControlListenerNewOptions) {
  const message = 'controlchange';
  const channel = this.settings.channels.input;
  const handler = (e) => {
    if (note !== e.controller.number) {
      return;
    }

    if (isToggle && e.value !== 127) {
      return;
    }

    callback(e);
  };

  this.device.input.addListener(message, channel, handler);
};

/**
 * Utility function to remove an input event from the device
 */
devicePrototype.removeControlListeners = function() {
  this.device.input.removeListener('controlchange');
};
