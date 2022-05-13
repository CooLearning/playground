import {Input, Output} from 'webmidi';
import {Device} from '../controllers/devices.controller';
import {
  ControllerSettings,
  SelectorSettings,
} from '../../devices/device/device.types';

interface PlayNotesOptions {
  firstNote: number;
  lastNote: number;
  color: number;
  duration: number;
}

export abstract class AbstractDevice {
  public input: Input;

  public output: Output;

  public settings: SelectorSettings | ControllerSettings;

  protected constructor(device: Device) {
    const {input, output, settings} = device;
    this.input = input;
    this.output = output;
    this.settings = settings;
  }

  protected playNotes(options: PlayNotesOptions): void {
    for (let i = options.firstNote; i <= options.lastNote; ++i) {
      this.output.playNote(i, {
        channels: 1,
        rawAttack: options.color,
        duration: options.duration,
      });
    }
  }

  protected boot(): void {
    this.bootSysex();
    this.bootLights();
  }

  protected bootSysex(): void {
    const {sysex} = this.settings.bootSequence;

    if (!sysex) {
      return;
    }

    const {manufacturer, data} = sysex;

    if (typeof manufacturer === 'undefined' || typeof data === 'undefined') {
      return;
    }
    
    this.output.sendSysex(manufacturer, data);
  }

  protected bootLights(): void {
    const delay = this.settings.time.defaultDuration + this.settings.time.wait;

    setTimeout(() => {
      this.playNotes({
        firstNote: this.settings.lights.first,
        lastNote: this.settings.lights.last,
        color: this.settings.bootSequence.color,
        duration: this.settings.time.defaultDuration,
      });
    }, delay);
  }
}
