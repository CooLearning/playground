import { presets } from '../../playground/state';
import { state } from '../../playground/playground';

export class PresetsView {
  private selectors: {
    contentNode: string;
    node: string;
    closeButton: string;
    dropdown: string;
  };

  private node: HTMLDialogElement;

  private content: HTMLDivElement;

  private closeButton: HTMLButtonElement;

  private dropdown: HTMLSelectElement;

  constructor () {
    this.selectors = {
      node: '#presets',
      closeButton: '.close-button',
      contentNode: '.mdl-dialog__content',
      dropdown: '[title=preset]',
    };

    this.node = document.querySelector (this.selectors.node);
    this.content = this.node.querySelector (this.selectors.contentNode);
    this.closeButton = this.node.querySelector (this.selectors.closeButton);
    this.dropdown = this.node.querySelector (this.selectors.dropdown);

    this.attachEvents ();
    this.populateDropdownOptions ();
  }

  attachEvents (): void {
    this.attachCloseButtonEvent ();
    this.attachClickOutsideEvent ();
    this.attachDropdownEvents ();
  }

  attachCloseButtonEvent (): void {
    this.closeButton.onclick = () => this.hide ();
  }

  attachClickOutsideEvent (): void {
    this.node.onclick = (e) => {
      // MDL adds `open` HTML attribute to the dialog container (outside) only
      if (e.target.open) {
        this.hide ();
      }
    };
  }

  attachDropdownEvents (): void {
    this.dropdown.onchange = () => {
      const preset = this.dropdown.value;
      if (preset) {
        state.networkPreset = preset;
        state.serialize ();
        window.location.reload ();
      }
    };
  }

  show (): void {
    this.node.showModal ();
  }

  hide (): void {
    this.node.close ();
  }

  populateDropdownOptions (): void {
    Object.keys (presets).forEach ((presetName) => {
      const option = document.createElement ('option');
      option.value = presetName;
      option.text = presetName;
      option.selected = presetName === state.networkPreset;
      this.dropdown.appendChild (option);
    });
  }
}
