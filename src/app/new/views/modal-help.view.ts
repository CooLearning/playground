import {AbstractModal} from '../common/abstract-modal';

export class ModalHelpView extends AbstractModal {
  public containers: HTMLDivElement[];

  public titles: HTMLHeadingElement[] = [];

  public images: HTMLImageElement[] = [];

  constructor() {
    super('#help');
    this.containers = Array.from(this.content.children[0].children).slice(1) as HTMLDivElement[];

    this.containers.forEach((container) => {
      this.titles.push(this.getTitle(container));
      this.images.push(this.getImage(container));
    });

    this.initialRender();
  }

  public showByTitle(title: HTMLHeadingElement): void {
    this.containers.forEach((container) => {
      const match = container.contains(title);

      if (!match) {
        this.hideImage(container);
        return;
      }

      this.showImage(container);
    });
  }

  public hideImage(container) {
    const image = this.getImage(container);
    image.style.display = 'none';
  }

  private getTitle(container) {
    return container.querySelector('h6');
  }

  private getImage(container) {
    return container.querySelector('img');
  }

  private showImage(container) {
    const image = this.getImage(container);
    image.style.display = 'block';
    image.scrollIntoView();
  }

  private initialRender() {
    this.containers.forEach((drawing) => {
      this.hideImage(drawing);
    });
  }
}
