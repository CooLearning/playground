export class PresetsView {
  private selectors: { contentNode: string; node: string; closeButton: string; };

  private node: HTMLDialogElement;

  private content: Element;

  private closeButton: HTMLButtonElement;

  constructor () {
    this.selectors = {
      node: '#presets',
      closeButton: '.close-button',
      contentNode: '.mdl-dialog__content',
    };

    this.node = document.querySelector (this.selectors.node);
    this.content = this.node.querySelector (this.selectors.contentNode);
    this.closeButton = this.node.querySelector (this.selectors.closeButton);

    this.attachEvents ();
  }

  attachEvents (): void {
    // clicking close button
    this.closeButton.onclick = () => this.hide ();

    // clicking outside container
    this.node.onclick = (e) => {
      // MDL adds `open` HTML attribute to the dialog container (outside) only
      if (e.target.open) {
        this.hide ();
      }
    };
  }

  show (): void {
    this.node.showModal ();
  }

  hide (): void {
    this.node.close ();
  }
}
