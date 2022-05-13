import {ControlChangeMessageEvent, NoteMessageEvent} from 'webmidi';
import {
  ControllerSettings,
  DeviceInterface,
  SelectorSettings,
} from './device.types';

interface AddControlListenerNewOptions {
  note: number;
  callback;
  isToggle: boolean;
}

interface AddNoteListenerNewOptions {
  note: number;
  color: number;
  callback: (e: NoteMessageEvent) => void;
}

interface BlinkNoteOptions {
  note: number;
  color: number;
  interval: number;
}

interface PlayNoteOptions {
  note: number;
  color: number;
  duration?: number;
}

interface PlayNotesOptions {
  firstNote: number;
  lastNote: number;
  color: number;
  duration?: number;
}

interface PlayOrBlinkNoteOptions {
  note: number;
  color: number;
  interval: number;
  duration: number;
}

export abstract class AbstractDevice {
  public isInitialized: boolean;

  public settings: ControllerSettings | SelectorSettings;

  protected device: DeviceInterface;

  private network: unknown;

  private blinkingNotes = {};

  public removeListeners(): void {
    this.device.input.removeListener();
  }

  public playNote({
    note,
    color,
    duration = 3600000,
  }: PlayNoteOptions): void {
    this.device.output.playNote(note, {
      // channels: this.settings.channels.output,
      duration,
      // rawVelocity: true,
      attack: color,
    });
  }

  public addNoteListener(
    noteState = 'on',
    listener: (e: NoteMessageEvent) => unknown,
  ): void {
    if (noteState !== 'on' && noteState !== 'off') {
      throw new Error('note should be either "on" or "off"');
    }

    this.device.input.addListener(
      `note${noteState}`,
      (e) => listener(e),
    );
  }

  public addControlListener(
    listener: (e: ControlChangeMessageEvent) => unknown,
    isToggle = false,
  ): void {
    this.device.input.addListener(
      'controlchange',
      (e) => {
        if (isToggle && e.value !== 127) {
          return;
        }
        listener(e);
      },
    );
  }

  public playNotes({
    firstNote,
    lastNote,
    color,
    duration = 3600000,
  }: PlayNotesOptions): void {
    for (let i = firstNote; i <= lastNote; ++i) {
      this.playNote({
        note: i,
        duration,
        color,
      });
    }
  }

  protected runBootSequence(): Promise<void> {
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
  }

  protected reset(): void {
    this.removeListeners();
    this.isInitialized = false;
    this.device = null;
    this.settings = null;
    this.network = null;
    this.blinkingNotes = {};
  }

  protected addNoteListener_NEW({
    note,
    color = undefined,
    callback,
  }: AddNoteListenerNewOptions): void {
    const message = 'noteon';

    if (color) {
      this.playNote({note, color});
    }

    const filterThenInvokeCallback = (e: NoteMessageEvent) => {
      if (note !== e.note.number) {
        return;
      }

      callback(e);
    };

    this.device.input.addListener(message, filterThenInvokeCallback);
  }

  protected addControlListener_NEW({
    note,
    callback,
    isToggle = false,
  }: AddControlListenerNewOptions): void {
    const message = 'controlchange';

    const handler = (e) => {
      if (note !== e.controller.number) {
        return;
      }

      if (isToggle && e.value !== 127) {
        return;
      }

      callback(e);
    };

    this.device.input.addListener(message, handler);
  }

  protected removeNoteListeners(noteState: string): void {
    if (noteState !== 'on' && noteState !== 'off') {
      throw new Error('note should be either "on" or "off"');
    }

    this.device.input.removeListener(`note${noteState}`);
  }

  private blinkNote({
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
  }

  private clearBlinkingNote(note): void {
    if (typeof this.blinkingNotes?.[note] === 'number') {
      clearTimeout(this.blinkingNotes[note]);
      this.blinkingNotes[note] = null;
    }
  }

  private playOrBlinkNote({
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
  }

  private removeControlListeners() {
    this.device.input.removeListener('controlchange');
  }
}
