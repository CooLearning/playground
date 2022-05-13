import {state} from '../../../playground/playground';
import {presets} from '../../../playground/state';
import {AbstractModal} from '../common/abstract-modal';

export class ModalPresetsView extends AbstractModal {
  public dropdown: HTMLSelectElement;

  public modal: AbstractModal;

  constructor() {
    super('#presets');
    this.dropdown = this.node.querySelector('[title=preset]');
    this.render();
  }

  private render(): void {
    const currentPreset = state?.networkPreset || 'allOn';

    Object.keys(presets).forEach((presetName) => {
      const option = document.createElement('option');
      option.value = presetName;
      option.text = presetName;
      option.selected = presetName === currentPreset;
      this.dropdown.appendChild(option);
    });
  }
}
