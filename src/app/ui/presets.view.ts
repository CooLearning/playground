// import {presets} from '../../playground/state';
// import {state} from '../../playground/playground';
//
// export class PresetsView {
//   private selectors: {
//     contentNode: string;
//     node: string;
//     closeButton: string;
//     dropdown: string;
//   };
//
//   private node: HTMLDialogElement;
//
//   private content: HTMLDivElement;
//
//   private closeButton: HTMLButtonElement;
//
//   private dropdown: HTMLSelectElement;
//
//   public constructor() {
//     this.selectors = {
//       node: '#presets',
//       closeButton: '.close-button',
//       contentNode: '.mdl-dialog__content',
//       dropdown: '[title=preset]',
//     };
//
//     this.node = document.querySelector(this.selectors.node);
//     this.content = this.node.querySelector(this.selectors.contentNode);
//     this.closeButton = this.node.querySelector(this.selectors.closeButton);
//     this.dropdown = this.node.querySelector(this.selectors.dropdown);
//
//     this.attachEvents();
//     this.populateDropdownOptions();
//   }
//
//   public attachEvents(): void {
//     this.attachCloseButtonEvent();
//     this.attachClickOutsideEvent();
//     this.attachDropdownEvents();
//   }
//
//   public attachCloseButtonEvent(): void {
//     this.closeButton.onclick = () => this.hide();
//   }
//
//   public attachClickOutsideEvent(): void {
//     this.node.onclick = (e) => {
//       // MDL adds `open` HTML attribute to the dialog container (outside) only
//       if (e.target.open) {
//         this.hide();
//       }
//     };
//   }
//
//   public attachDropdownEvents(): void {
//     this.dropdown.onchange = () => {
//       const preset = this.dropdown.value;
//       if (preset) {
//         state.networkPreset = preset;
//         state.serialize();
//         window.location.reload();
//       }
//     };
//   }
//
//   public show(): void {
//     this.node.showModal();
//   }
//
//   public hide(): void {
//     this.node.close();
//   }
//
//   public populateDropdownOptions(): void {
//     const currentPreset = state?.networkPreset || 'allOn';
//     Object.keys(presets).forEach((presetName) => {
//       const option = document.createElement('option');
//       option.value = presetName;
//       option.text = presetName;
//       option.selected = presetName === currentPreset;
//       this.dropdown.appendChild(option);
//     });
//   }
// }
