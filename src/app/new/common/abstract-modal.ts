export abstract class AbstractModal {
  public readonly node: HTMLDialogElement;

  protected content: HTMLDivElement;

  private close: HTMLButtonElement;

  protected constructor(selector: string) {
    this.node = document.querySelector(selector);
    this.content = this.node.querySelector('.mdl-dialog__content');
    this.close = this.node.querySelector('.close-button');

    this.handleClose();
  }

  public show(): void {
    this.node.showModal();
  }

  private hide() {
    this.node.close();
  }

  private handleClose() {
    // clicking close button
    this.close.addEventListener('click', () => {
      this.hide();
    });

    // clicking outside container
    this.node.addEventListener('click', (e) => {
      // MDL adds `open` HTML attribute to the dialog container (outside) only
      if (!e.target.open) {
        return;
      }
      this.hide();
    });
  }
}
